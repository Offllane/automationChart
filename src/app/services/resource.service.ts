
import { Injectable } from '@angular/core';
import testData from '../models/testData2.json';
import chartsData from '../models/chartsData.json'
import {IChartParams, IListChartItem} from "../models/interfaces";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  public chartsData:Subject<IChartParams> = new Subject<IChartParams>(); // TODO удалится после подключенгия к бэку чартов

  constructor() { }

  // get data for main chart
  public getAllMainPersonsCardsByChartId(chartId: number): Array<IListChartItem> {
    return testData.employees.filter(employee => employee.chartId == chartId); //TODO метод поменяется на запрос к бэку
  }

  // get data for buffer chart
  public getAllBufferPersonsCardsByChartId(chartId: number): Array<IListChartItem> {
    return testData.bufferEmployees.filter(employee => employee.chartId == chartId); //TODO метод поменяется на запрос к бэку
  }

  public getChartsByUserId(userId: number): Array<IChartParams> {
    return chartsData.charts.filter(chart => chart.userId == userId);
  }
}
