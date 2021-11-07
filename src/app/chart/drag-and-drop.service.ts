import {ChartService} from "./chart.service";
import {Subscription} from "rxjs";
import {Injectable, OnDestroy} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService implements OnDestroy{
  private dataSubscription = new Subscription();
  private employeeList = [];
  private employeeTree = []
  public draggedItemId: number | undefined;
  public dropPlaceholderItemId: number | undefined;
  private mainBossItem: any;

  constructor(
    private chartService: ChartService
  ) {
    this.dataSubscription.add(this.chartService.listChartData.subscribe(employeeList => {
      this.employeeList = employeeList;
    }));
    this.dataSubscription.add(this.chartService.treeChartData.subscribe(treeEmployeeList => {
      this.employeeTree = treeEmployeeList;
      this.mainBossItem = treeEmployeeList[0];
    }))
  }

  private updateEmployeeList(employeeList: any): void {
    this.employeeList = employeeList;
    this.chartService.listChartData.next(this.employeeList);
  }

  public replaceItem(): void {
    if (this.draggedItemId === this.dropPlaceholderItemId) { // if we don't drop item on itself
      return;
    }

    const employeeList: any = [...this.employeeList];
    const draggedItem = employeeList.find((item: any) => item.id === this.draggedItemId);
    const draggedItemWithSubordinates = this.findTreeItemById(this.mainBossItem, this.draggedItemId);
    const dropPlaceholderItem = employeeList.find((item: any) => item.id === this.dropPlaceholderItemId)

    if (!this.isItemSubordinate(draggedItemWithSubordinates, dropPlaceholderItem)) {
      draggedItem.parentId = this.dropPlaceholderItemId;
    } else { // TODO swap items
      // draggedItem.parentId = dropPlaceholderItem.parentId;
      // dropPlaceholderItem.parentId = draggedItem.parentId;
    }

    this.updateEmployeeList(employeeList);
  }

  private findTreeItemById(bossItem: any ,id: any): any {
    if (bossItem.id === id) {
      return bossItem;
    } else if (bossItem.subordinates.length) {
      let result = null;
      for (let i = 0; i < bossItem.subordinates.length && result === null; i++) {
         result = this.findTreeItemById(bossItem.subordinates[i], id);
      }
      return  result;
    } else {
      return null;
    }
  }

  private isItemSubordinate(possibleBossItem: any, possibleSubordinateItem: any): boolean {
    return this.findTreeItemById(possibleBossItem, possibleSubordinateItem.id) !== null;
  }

  public ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
