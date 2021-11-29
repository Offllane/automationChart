
import { Injectable } from '@angular/core';
import testData from '../models/testData2.json';
import testDataBuffer from '../models/testDataBuffer1.json';
import {listChartItem} from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {

  constructor() { }

  public getAllMainPersonsCardsByChartId(chartId: number): Array<listChartItem> {
    return testData.employees.filter(employee => employee.chartId == chartId); //TODO метод поменяется на запрос к бэку
  }

  public getAllBufferPersonsCardsByChartId(chartId: number): Array<listChartItem> {
    return testData.bufferEmployees.filter(employee => employee.chartId == chartId); //TODO метод поменяется на запрос к бэку
  }
}
