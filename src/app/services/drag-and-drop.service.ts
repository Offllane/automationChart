import {ChartService} from "./chart.service";
import {Subscription} from "rxjs";
import {Injectable, OnDestroy} from "@angular/core";
import {IListChartItem, ITreeChartItem} from "../models/interfaces";
import {ResourceService} from "./resource.service";

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService implements OnDestroy{
  private dataSubscription = new Subscription();
  private employeeList: Array<IListChartItem> = [];
  private employeeTrees: Array<ITreeChartItem> = []
  private bufferEmployeeList: Array<IListChartItem> = [];
  private bufferEmployeeTrees: Array<ITreeChartItem> = [];
  public draggedItemId: number = -1; // init value
  public isDraggedItemFromBuffer = false;
  public dropPlaceholderItemId: number | null = -1; // init value

  constructor(
    private chartService: ChartService,
    private resourceService: ResourceService
  ) {
    this.dataSubscription.add(this.chartService.listChartData.subscribe((employeeList: Array<IListChartItem>) => {
      this.employeeList = employeeList;
    }));
    this.dataSubscription.add(this.chartService.treeChartData.subscribe((treeEmployeeList: Array<ITreeChartItem>) => {
      this.employeeTrees = treeEmployeeList;
    }));
    this.dataSubscription.add(this.chartService.bufferListChartData.subscribe((bufferTreeEmployeeList: Array<IListChartItem>) => {
      this.bufferEmployeeList = bufferTreeEmployeeList;
    }));
    this.dataSubscription.add(this.chartService.bufferTreeChartData.subscribe((bufferTreeEmployeeList: Array<ITreeChartItem>) => {
      this.bufferEmployeeTrees = bufferTreeEmployeeList;
    }));
  }

  private updateEmployeeList(employeeList: Array<IListChartItem>): void {
    this.employeeList = employeeList;
    this.chartService.listChartData.next(this.employeeList);
  }

  private updateBufferEmployeeList(bufferEmployeeList: Array<IListChartItem>): void {
    this.bufferEmployeeList = bufferEmployeeList;
    this.chartService.bufferListChartData.next(this.bufferEmployeeList);
  }

  public replaceItemToNewPosition(isDropPlaceholderItemFromBuffer: boolean, isDraggedItemFromBuffer: boolean = this.isDraggedItemFromBuffer): void {
    if (this.draggedItemId === this.dropPlaceholderItemId) { // if we drop item to itself then return
      return;
    }

    let employeeList: Array<IListChartItem> = [...this.employeeList];
    let bufferEmployeeList: Array<IListChartItem> = [...this.bufferEmployeeList];

    const draggedItem: IListChartItem = isDraggedItemFromBuffer ?
      bufferEmployeeList.find((item: IListChartItem) => item.id === this.draggedItemId) as IListChartItem
      : employeeList.find((item: IListChartItem) => item.id === this.draggedItemId) as IListChartItem;
    const dropPlaceholderItem: IListChartItem | undefined = isDropPlaceholderItemFromBuffer ?
      bufferEmployeeList.find((item: IListChartItem) => item.id === this.dropPlaceholderItemId)
      : employeeList.find((item: IListChartItem) => item.id === this.dropPlaceholderItemId);

    // for check subordinating of dragged item
    let draggedItemWithSubordinates: ITreeChartItem | null = null;
    for (let i = 0; i < this.employeeTrees.length && draggedItemWithSubordinates === null; i++) {
      draggedItemWithSubordinates = this.findTreeItemById(this.employeeTrees[i], this.draggedItemId);
    }
    for (let i = 0; i < this.bufferEmployeeTrees.length, draggedItemWithSubordinates === null; i++) {
      draggedItemWithSubordinates = this.findTreeItemById(this.bufferEmployeeTrees[i], this.draggedItemId)
    }

    if (!this.isItemSubordinate(draggedItemWithSubordinates, dropPlaceholderItem)) {
      draggedItemWithSubordinates.parentId = dropPlaceholderItem?.id ?? null;
      draggedItem.parentId = dropPlaceholderItem?.id ?? null;
      this.resourceService.updatePersonCard(draggedItem).subscribe(() => {
      },
        error => {console.log(error)});

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

  private isItemSubordinate(possibleBossItem: ITreeChartItem, possibleSubordinateItem: IListChartItem | undefined): boolean {
    const id = possibleSubordinateItem?.id ?? null;
    return this.findTreeItemById(possibleBossItem, id) !== null;
  }

  private findTreeItemById(bossItem: ITreeChartItem, id: number | null): ITreeChartItem | null {
    if (bossItem.id === id) {
      return bossItem;
    } else if (bossItem.subordinates.length) {
      let result: ITreeChartItem | null = null;
      for (let i = 0; i < bossItem.subordinates.length && result === null; i++) {
         result = this.findTreeItemById(bossItem.subordinates[i], id);
      }
      return  result;
    } else {
      return null;
    }
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

  public ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
