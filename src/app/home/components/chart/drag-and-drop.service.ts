import {ChartService} from "./chart.service";
import {Subscription} from "rxjs";
import {Injectable, OnDestroy} from "@angular/core";
import {listChartItem, treeChartItem} from "../../../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService implements OnDestroy{
  private dataSubscription = new Subscription();
  private employeeList: Array<listChartItem> = [];
  private employeeTree: Array<treeChartItem> = []
  public draggedItemId: number = -1; // init value
  public dropPlaceholderItemId: number = -1; // init value
  private mainBossItem: treeChartItem = {} as treeChartItem;
  private mainItemsArray: Array<treeChartItem> = [];

  constructor(
    private chartService: ChartService
  ) {
    this.dataSubscription.add(this.chartService.listChartData.subscribe((employeeList: Array<listChartItem>) => {
      this.employeeList = employeeList;
    }));
    this.dataSubscription.add(this.chartService.treeChartData.subscribe((treeEmployeeList: Array<treeChartItem>) => {
      this.employeeTree = treeEmployeeList;
      this.mainItemsArray = treeEmployeeList.filter(employee => employee.id === null);
      this.mainItemsArray = this.employeeTree;
      this.mainBossItem = treeEmployeeList[0];
    }))
  }

  private updateEmployeeList(employeeList: Array<listChartItem>): void {
    this.employeeList = employeeList;
    this.chartService.listChartData.next(this.employeeList);
  }

  public replaceItem(): void {
    if (this.draggedItemId === this.dropPlaceholderItemId) { // if we don't drop item on itself
      return;
    }

    const employeeList: Array<listChartItem> = [...this.employeeList];
    const draggedItem: listChartItem = employeeList.find((item: listChartItem) => item.id === this.draggedItemId) as listChartItem;
    let draggedItemWithSubordinates: treeChartItem | any;
    for (let i = 0, neededItem = null; i < this.mainItemsArray.length, neededItem === null; i++) {
      neededItem = this.findTreeItemById(this.mainItemsArray[i], this.draggedItemId) as treeChartItem;
      draggedItemWithSubordinates = neededItem;
    }
    const dropPlaceholderItem: listChartItem = employeeList.find((item: listChartItem) => item.id === this.dropPlaceholderItemId) as listChartItem;
    if (!this.isItemSubordinate(draggedItemWithSubordinates, dropPlaceholderItem)) {
      draggedItem.parentId = this.dropPlaceholderItemId;
    } else { // TODO warning popup
    }

    this.updateEmployeeList(employeeList);
  }

  private isItemSubordinate(possibleBossItem: treeChartItem, possibleSubordinateItem: listChartItem): boolean {
    return this.findTreeItemById(possibleBossItem, possibleSubordinateItem.id) !== null;
  }

  private findTreeItemById(bossItem: treeChartItem, id: number): treeChartItem | null {
    if (bossItem.id === id) {
      return bossItem;
    } else if (bossItem.subordinates.length) {
      let result: treeChartItem | null = null;
      for (let i = 0; i < bossItem.subordinates.length && result === null; i++) {
         result = this.findTreeItemById(bossItem.subordinates[i], id);
      }
      return  result;
    } else {
      return null;
    }
  }

  public ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
