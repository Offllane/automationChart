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
  private employeeTrees: Array<treeChartItem> = []
  private bufferEmployeeList: Array<listChartItem> = [];
  private bufferEmployeeTrees: Array<treeChartItem> = [];
  public draggedItemId: number = -1; // init value
  public isDraggedItemFromBuffer = false;
  public dropPlaceholderItemId: number = -1; // init value

  constructor(
    private chartService: ChartService
  ) {
    this.dataSubscription.add(this.chartService.listChartData.subscribe((employeeList: Array<listChartItem>) => {
      this.employeeList = employeeList;
    }));
    this.dataSubscription.add(this.chartService.treeChartData.subscribe((treeEmployeeList: Array<treeChartItem>) => {
      this.employeeTrees = treeEmployeeList;
    }));
    this.dataSubscription.add(this.chartService.bufferListChartData.subscribe((bufferTreeEmployeeList: Array<listChartItem>) => {
      this.bufferEmployeeList = bufferTreeEmployeeList;
    }));
    this.dataSubscription.add(this.chartService.bufferTreeChartData.subscribe((bufferTreeEmployeeList: Array<treeChartItem>) => {
      this.bufferEmployeeTrees = bufferTreeEmployeeList;
    }));
  }

  private updateEmployeeList(employeeList: Array<listChartItem>): void {
    this.employeeList = employeeList;
    this.chartService.listChartData.next(this.employeeList);
  }

  private updateBufferEmployeeList(bufferEmployeeList: Array<listChartItem>): void {
    this.bufferEmployeeList = bufferEmployeeList;
    this.chartService.bufferListChartData.next(this.bufferEmployeeList);
  }

  public replaceItem(isDropPlaceholderItemFromBuffer: boolean): void {
    if (this.draggedItemId === this.dropPlaceholderItemId) { // if we drop item to itself then return
      return;
    }

    const employeeList: Array<listChartItem> = [...this.employeeList];
    const bufferEmployeeList: Array<listChartItem> = [...this.bufferEmployeeList];

    const draggedItem: listChartItem = this.isDraggedItemFromBuffer ?
      bufferEmployeeList.find((item: listChartItem) => item.id === this.draggedItemId) as listChartItem
      : employeeList.find((item: listChartItem) => item.id === this.draggedItemId) as listChartItem;
    const dropPlaceholderItem: listChartItem = isDropPlaceholderItemFromBuffer ?
      bufferEmployeeList.find((item: listChartItem) => item.id === this.dropPlaceholderItemId) as listChartItem
      : employeeList.find((item: listChartItem) => item.id === this.dropPlaceholderItemId) as listChartItem;

    // for check subordinating of dragged item
    let draggedItemWithSubordinates: treeChartItem | null = null;
    for (let i = 0; i < this.employeeTrees.length && draggedItemWithSubordinates === null; i++) {
      draggedItemWithSubordinates = this.findTreeItemById(this.employeeTrees[i], this.draggedItemId);
    }
    for (let i = 0; i < this.bufferEmployeeTrees.length, draggedItemWithSubordinates === null; i++) {
      draggedItemWithSubordinates = this.findTreeItemById(this.bufferEmployeeTrees[i], this.draggedItemId)
    }
    console.log(draggedItem, dropPlaceholderItem);
    if (!this.isItemSubordinate(draggedItemWithSubordinates, dropPlaceholderItem)) {
      draggedItem.parentId = this.dropPlaceholderItemId;
    } else { // TODO warning popup
    }

    this.updateBufferEmployeeList(bufferEmployeeList);
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
