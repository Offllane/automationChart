import {Injectable, OnDestroy} from '@angular/core';
import testData from '../../../models/testData2.json';
import testDataBuffer from '../../../models/testDataBuffer1.json';
import {BehaviorSubject, Subscription} from "rxjs";
import {listChartItem, treeChartItem} from "../../../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ChartService implements OnDestroy{
  private dataSubscription: Subscription = new Subscription();

  public listChartData: BehaviorSubject<Array<listChartItem>> = new BehaviorSubject<Array<listChartItem>>([]);
  public treeChartData: BehaviorSubject<Array<treeChartItem>> = new BehaviorSubject<Array<treeChartItem>>([]);
  public bufferListChartData: BehaviorSubject<Array<listChartItem>> = new BehaviorSubject<Array<listChartItem>>([]);
  public bufferTreeChartData: BehaviorSubject<Array<treeChartItem>> = new BehaviorSubject<Array<treeChartItem>>([]);

  public employeeList: Array<listChartItem> = [];
  public bufferEmployeeList: Array<listChartItem> = [];


  constructor() {
    this.listChartData.next(testData.employees); // будет браться из запроса к бд по идее
    this.treeChartData.next(this.prepareChartDataList(testData.employees));
    this.bufferListChartData.next(testDataBuffer.employees); // будет браться из запроса к бд по идее
    this.bufferTreeChartData.next(this.prepareChartDataList(testDataBuffer.employees));


    this.dataSubscription.add(this.listChartData.subscribe((data: Array<listChartItem>) => {
      this.employeeList = data;
      this.treeChartData.next(this.prepareChartDataList(data));
    }));
    this.dataSubscription.add(this.bufferListChartData.subscribe((data: Array<listChartItem>) => {
      this.bufferEmployeeList = data;
    }));
  }

  public prepareChartDataList(employeeList: Array<listChartItem>): Array<treeChartItem> {
    return this.orderInformation(employeeList);
  }

  public orderInformation(employeeArray: Array<listChartItem>): Array<treeChartItem> {
    const treeEmployeeArray: Array<treeChartItem> = employeeArray.map(employee => {
      return {
        ...employee,
        subordinates: new Array<treeChartItem>(),
        isHide: false
      };
    });

    treeEmployeeArray.forEach(employee => employee.subordinates = this.findSubordinates(treeEmployeeArray, employee.id));
    while (treeEmployeeArray.length !== 1) {
      treeEmployeeArray.pop();
    }
    return treeEmployeeArray;
  }

  private findSubordinates(employeeArray: Array<treeChartItem>, id: number): Array<treeChartItem> {
    return employeeArray.filter(employee => employee.parentId === id);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
