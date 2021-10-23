import { Injectable } from '@angular/core';
import testData from '../models/testData2.json';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  public chartData: BehaviorSubject<any> = new BehaviorSubject([]);
  public employees;


  constructor() {
    console.log('here');
    this.employees = this.orderInformation(testData.employees);
    this.chartData.next(this.orderInformation(testData.employees));
  }

  orderInformation(employeeArray: Array<any>): Array<any> {
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

  findSubordinates(employeeArray: any[], id: number): Array<any> {
    return employeeArray.filter(employee => employee.parentId === id);
  }
}
