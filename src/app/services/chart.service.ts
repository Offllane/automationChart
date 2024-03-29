import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {IListChartItem, ITreeChartItem} from "../models/interfaces";
import {ResourceService} from "./resource.service";
import {Router} from "@angular/router";

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

  public currentSelectedChartId: number = 0;

  constructor(
    private resourceService: ResourceService,
    private router: Router
  ) {


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

  public setChartPersonCard(chartCards: Array<IListChartItem>) {
    const destructedChartCards = [...chartCards];
    const orderedCards = this.orderInformation(destructedChartCards);
    const nullCardsWithSubordinates = orderedCards.slice(1); // null items with Subordinates
    let bufferCards : any = []
    for (let i = 0; i < nullCardsWithSubordinates.length; i++) {
      const updatedList = this.replaceItemsBetweenLists(destructedChartCards, bufferCards, nullCardsWithSubordinates[i]);
      bufferCards = updatedList.endList;
    }

    this.listChartData.next(destructedChartCards);
    this.bufferListChartData.next(bufferCards);
  }

  private replaceItemsBetweenLists(startList: Array<IListChartItem>, endList:Array<IListChartItem>, draggedItem: ITreeChartItem) {
    endList.push(draggedItem);
    startList = this.removeItemFromList(draggedItem.id, startList);
    for (let i = 0; i < draggedItem.subordinates.length; i++) {
      this.replaceItemsBetweenLists(startList, endList, draggedItem.subordinates[i]);
    }

    return {startList: startList, endList: endList};
  }

  private removeItemFromList(id: number, list: Array<IListChartItem>): Array<IListChartItem> {
    const neededItemIndex = list.findIndex((employee: IListChartItem) => employee.id === id);
    list.splice(neededItemIndex, 1);

    return list;
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
