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
  public dropPlaceholderItemId: number | null = -1; // init value

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

  public replaceItemToNewPosition(isDropPlaceholderItemFromBuffer: boolean, isDraggedItemFromBuffer: boolean = this.isDraggedItemFromBuffer): void {
    if (this.draggedItemId === this.dropPlaceholderItemId) { // if we drop item to itself then return
      return;
    }

    let employeeList: Array<listChartItem> = [...this.employeeList];
    let bufferEmployeeList: Array<listChartItem> = [...this.bufferEmployeeList];

    const draggedItem: listChartItem = isDraggedItemFromBuffer ?
      bufferEmployeeList.find((item: listChartItem) => item.id === this.draggedItemId) as listChartItem
      : employeeList.find((item: listChartItem) => item.id === this.draggedItemId) as listChartItem;
    const dropPlaceholderItem: listChartItem | undefined = isDropPlaceholderItemFromBuffer ?
      bufferEmployeeList.find((item: listChartItem) => item.id === this.dropPlaceholderItemId)
      : employeeList.find((item: listChartItem) => item.id === this.dropPlaceholderItemId);

    // for check subordinating of dragged item
    let draggedItemWithSubordinates: treeChartItem | null = null;
    for (let i = 0; i < this.employeeTrees.length && draggedItemWithSubordinates === null; i++) {
      draggedItemWithSubordinates = this.findTreeItemById(this.employeeTrees[i], this.draggedItemId);
    }
    for (let i = 0; i < this.bufferEmployeeTrees.length, draggedItemWithSubordinates === null; i++) {
      draggedItemWithSubordinates = this.findTreeItemById(this.bufferEmployeeTrees[i], this.draggedItemId)
    }

    if (!this.isItemSubordinate(draggedItemWithSubordinates, dropPlaceholderItem)) {
      draggedItemWithSubordinates.parentId = dropPlaceholderItem?.id ?? null;
      draggedItem.parentId = dropPlaceholderItem?.id ?? null;

      // remove item form dragged array
      if(isDraggedItemFromBuffer && !isDropPlaceholderItemFromBuffer) {
        const updatedLists = this.replaceItemsBetweenLists(bufferEmployeeList, employeeList, draggedItemWithSubordinates);
        bufferEmployeeList = updatedLists.startList;
        employeeList = updatedLists.endList;
      } else if (!isDraggedItemFromBuffer && isDropPlaceholderItemFromBuffer) {
        const updatedLists = this.replaceItemsBetweenLists(employeeList, bufferEmployeeList, draggedItemWithSubordinates);
        employeeList = updatedLists.startList;
        bufferEmployeeList = updatedLists.endList;
      }
    } else { // TODO warning popup
    }

    this.updateBufferEmployeeList(bufferEmployeeList);
    this.updateEmployeeList(employeeList);
  }

  private isItemSubordinate(possibleBossItem: treeChartItem, possibleSubordinateItem: listChartItem | undefined): boolean {
    const id = possibleSubordinateItem?.id ?? null;
    return this.findTreeItemById(possibleBossItem, id) !== null;
  }

  private findTreeItemById(bossItem: treeChartItem, id: number | null): treeChartItem | null {
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

  private replaceItemsBetweenLists(startList: Array<listChartItem>, endList:Array<listChartItem>, draggedItem: treeChartItem) {
    endList.push(draggedItem);
    startList = this.removeItemFromList(draggedItem.id, startList);
    for (let i = 0; i < draggedItem.subordinates.length; i++) {
      this.replaceItemsBetweenLists(startList, endList, draggedItem.subordinates[i]);
    }

    return {startList: startList, endList: endList};
  }

  private removeItemFromList(id: number, list: Array<listChartItem>): Array<listChartItem> {
    const neededItemIndex = list.findIndex((employee: listChartItem) => employee.id === id);
    list.splice(neededItemIndex, 1);

    return list;
  }

  public ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
