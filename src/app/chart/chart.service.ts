import { Injectable } from '@angular/core';
import testData from '../models/testData2.json';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  public standardChartData: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public preparedChartData: BehaviorSubject<any> = new BehaviorSubject([]);
  public standardEmployeeList: any;


  constructor() {
    this.standardChartData.next(testData.employees)
    this.prepareChartDataList(testData.employees);

    this.standardChartData.subscribe(data => {
      this.standardEmployeeList = data;
      this.prepareChartDataList(data);
    })
  }

  public prepareChartDataList(employeeList: any): any {
    const orderedEmployeeList = this.orderInformation(employeeList);
    this.preparedChartData.next(orderedEmployeeList);
    return orderedEmployeeList;
  }

  public orderInformation(employeeArray: Array<any>): Array<any> {
    employeeArray = employeeArray.map(employee => {
      return {
        ...employee,
        subordinates: new Array<any>(),
        isHide: false
      };
    });
    employeeArray.forEach(employee => employee.subordinates = this.findSubordinates(employeeArray, employee.id));
    while (employeeArray.length !== 1) {
      employeeArray.pop();
    }
    return employeeArray;
  }

  private findSubordinates(employeeArray: any[], id: number): Array<any> {
    return employeeArray.filter(employee => employee.parentId === id);
  }
}
