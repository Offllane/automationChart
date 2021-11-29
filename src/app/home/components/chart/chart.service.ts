import {Injectable, OnDestroy} from '@angular/core';
import testDataBuffer from '../../../models/testDataBuffer1.json';
import {BehaviorSubject, Subscription} from "rxjs";
import {listChartItem, treeChartItem} from "../../../models/interfaces";
import {ResourceService} from "../../../services/resource.service";

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

  public currentChartId: number = 0;

  constructor(
    private resourceService: ResourceService
  ) {
    // this.listChartData.next(testData.employees); // будет браться из запроса к бд по идее
    // this.treeChartData.next(this.prepareChartDataList(testData.employees));
    // this.bufferListChartData.next(testDataBuffer.employees); // будет браться из запроса к бд по идее
    // this.bufferTreeChartData.next(this.prepareChartDataList(testDataBuffer.employees));


    this.dataSubscription.add(this.listChartData.subscribe((data: Array<listChartItem>) => {
      this.employeeList = data;
      this.treeChartData.next(this.prepareChartDataList(data));
    }));
    this.dataSubscription.add(this.bufferListChartData.subscribe((data: Array<listChartItem>) => {
      this.bufferEmployeeList = data;
      this.bufferTreeChartData.next(this.prepareChartDataList(data));
    }));
  }

  public prepareChartDataList(employeeList: Array<listChartItem>): Array<treeChartItem> {
    return this.orderInformation(employeeList);
  }

  public orderInformation(employeeArray: Array<listChartItem>): Array<treeChartItem> {
    // add new field to user model
    const treeEmployeeArray: Array<treeChartItem> = employeeArray.map(employee => {
      return {
        ...employee,
        subordinates: new Array<treeChartItem>(),
        isHide: false
      };
    });

    let _treeEmployeeArray = [...treeEmployeeArray]; // деструктуризация массива
    _treeEmployeeArray.forEach(employee => employee.subordinates = this.findSubordinates(_treeEmployeeArray, employee.id));
    _treeEmployeeArray = _treeEmployeeArray.filter(employee => employee.parentId === null);
    return _treeEmployeeArray;
  }

  private findSubordinates(employeeArray: Array<treeChartItem>, id: number): Array<treeChartItem> {
    return employeeArray.filter(employee => employee.parentId === id);
  }

  public findMaxIdInEmployeeList(): number {
    const listIdsArray = this.employeeList.map((item: listChartItem) => item.id);
    this.bufferEmployeeList.map((item: listChartItem) => listIdsArray.push(item.id));

    function arrayMax(array: Array<number>): number {
      return array.length === 0 ? 0 : array.reduce((a: number, b: number) => Math.max(a, b));
    }
    return arrayMax(listIdsArray);
  }

  public setAllEmployeeCardsByChartId(chartId: number) {
    const currentChartMainCards:Array<listChartItem> = this.resourceService.getAllMainPersonsCardsByChartId(chartId);
    const currentChartBufferCards:Array<listChartItem> = this.resourceService.getAllBufferPersonsCardsByChartId(chartId);
    this.listChartData.next(currentChartMainCards);
    this.bufferListChartData.next(currentChartBufferCards);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
