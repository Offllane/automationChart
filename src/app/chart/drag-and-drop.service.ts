import {Injectable, OnInit} from '@angular/core';
import {ChartService} from "./chart.service";

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {
  private standardEmployeeList = [];
  public draggedItemId: number | undefined;
  public dropPlaceholderItemId: number | undefined;

  constructor(
    private chartService: ChartService
  ) {
    this.chartService.standardChartData.subscribe(employeeList => {
      this.standardEmployeeList = employeeList;
    });
  }

  private updateEmployeeList(employeeList: any): void {
    this.standardEmployeeList = employeeList;
    this.chartService.standardChartData.next(this.standardEmployeeList);
    console.log(employeeList);
  }

  public replaceItem(): void {
    const employeeList: any = [...this.standardEmployeeList];

    const draggedItemIndex = employeeList.findIndex((item: any) => item.id === this.draggedItemId);
    employeeList[draggedItemIndex].parentId = this.dropPlaceholderItemId;

    this.updateEmployeeList(employeeList);
  }
}
