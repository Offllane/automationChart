import {Injectable, OnDestroy} from '@angular/core';
import testDataBuffer from '../../../models/testDataBuffer1.json';
import {BehaviorSubject, Subscription} from "rxjs";
import {IListChartItem, ITreeChartItem} from "../../../models/interfaces";
import {ResourceService} from "../../../services/resource.service";

@Injectable({
  providedIn: 'root'
})
export class ChartService implements OnDestroy{
  private dataSubscription: Subscription = new Subscription();

  public listChartData: BehaviorSubject<Array<IListChartItem>> = new BehaviorSubject<Array<IListChartItem>>([]);
  public treeChartData: BehaviorSubject<Array<ITreeChartItem>> = new BehaviorSubject<Array<ITreeChartItem>>([]);
  public bufferListChartData: BehaviorSubject<Array<IListChartItem>> = new BehaviorSubject<Array<IListChartItem>>([]);
  public bufferTreeChartData: BehaviorSubject<Array<ITreeChartItem>> = new BehaviorSubject<Array<ITreeChartItem>>([]);

  public employeeList: Array<IListChartItem> = [];
  public bufferEmployeeList: Array<IListChartItem> = [];

  public currentChartId: number = 0;

  constructor(
    private resourceService: ResourceService
  ) {
    // this.listChartData.next(testData.employees); // будет браться из запроса к бд по идее
    // this.treeChartData.next(this.prepareChartDataList(testData.employees));
    // this.bufferListChartData.next(testDataBuffer.employees); // будет браться из запроса к бд по идее
    // this.bufferTreeChartData.next(this.prepareChartDataList(testDataBuffer.employees));


    this.dataSubscription.add(this.listChartData.subscribe((data: Array<IListChartItem>) => {
      this.employeeList = data;
      this.treeChartData.next(this.prepareChartDataList(data));
    }));
    this.dataSubscription.add(this.bufferListChartData.subscribe((data: Array<IListChartItem>) => {
      this.bufferEmployeeList = data;
      this.bufferTreeChartData.next(this.prepareChartDataList(data));
    }));
  }

  public prepareChartDataList(employeeList: Array<IListChartItem>): Array<ITreeChartItem> {
    return this.orderInformation(employeeList);
  }

  public orderInformation(employeeArray: Array<IListChartItem>): Array<ITreeChartItem> {
    // add new field to user model
    const treeEmployeeArray: Array<ITreeChartItem> = employeeArray.map(employee => {
      return {
        ...employee,
        subordinates: new Array<ITreeChartItem>(),
        isHide: false
      };
    });

    let _treeEmployeeArray = [...treeEmployeeArray]; // деструктуризация массива
    _treeEmployeeArray.forEach(employee => employee.subordinates = this.findSubordinates(_treeEmployeeArray, employee.id));
    _treeEmployeeArray = _treeEmployeeArray.filter(employee => employee.parentId === null);
    return _treeEmployeeArray;
  }

  private findSubordinates(employeeArray: Array<ITreeChartItem>, id: number): Array<ITreeChartItem> {
    return employeeArray.filter(employee => employee.parentId === id);
  }

  public findMaxIdInEmployeeList(): number {
    const listIdsArray = this.employeeList.map((item: IListChartItem) => item.id);
    this.bufferEmployeeList.map((item: IListChartItem) => listIdsArray.push(item.id));

    function arrayMax(array: Array<number>): number {
      return array.length === 0 ? 0 : array.reduce((a: number, b: number) => Math.max(a, b));
    }
    return arrayMax(listIdsArray);
  }

  public setAllEmployeeCardsByChartId(chartId: number) {
    const currentChartMainCards:Array<IListChartItem> = this.resourceService.getAllMainPersonsCardsByChartId(chartId);
    const currentChartBufferCards:Array<IListChartItem> = this.resourceService.getAllBufferPersonsCardsByChartId(chartId);
    this.listChartData.next(currentChartMainCards);
    this.bufferListChartData.next(currentChartBufferCards);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
