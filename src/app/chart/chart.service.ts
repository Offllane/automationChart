import { Injectable } from '@angular/core';
import testData from '../models/testData2.json';
import {BehaviorSubject} from "rxjs";
import {listChartItem, treeChartItem} from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  public listChartData: BehaviorSubject<Array<listChartItem>> = new BehaviorSubject<Array<listChartItem>>([]);
  public treeChartData: BehaviorSubject<Array<treeChartItem>> = new BehaviorSubject<Array<treeChartItem>>([]);
  public employeeList: Array<listChartItem> = [];


  constructor() {
    this.listChartData.next(testData.employees)
    this.prepareChartDataList(testData.employees);

    this.listChartData.subscribe((data: Array<listChartItem>) => {
      this.employeeList = data;
      this.prepareChartDataList(data);
    })
  }

  public prepareChartDataList(employeeList: Array<listChartItem>): Array<treeChartItem> {
    const orderedEmployeeList = this.orderInformation(employeeList);
    this.treeChartData.next(orderedEmployeeList);
    return orderedEmployeeList;
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
}
