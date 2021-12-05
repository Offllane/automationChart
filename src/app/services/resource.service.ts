import { Injectable } from '@angular/core';
import testData from '../models/testData2.json';
import chartsData from '../models/chartsData.json'
import {IChartParams, IListChartItem, ILoginInform, IUserCredentials} from "../models/interfaces";
import {Subject} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {shareReplay } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  public chartsData:Subject<IChartParams> = new Subject<IChartParams>(); // TODO удалится после подключенгия к бэку чартов
  private apiLocal = 'https://localhost:44362';
  private api = 'http://offllane-aitomation-chart.somee.com';

  constructor(
    private http: HttpClient
  ) {
    this.api = this.apiLocal;
  }

  // // get data for main chart
  // public getAllMainPersonsCardsByChartId(chartId: number): Array<IListChartItem> {
  //   return testData.employees.filter(employee => employee.chartId == chartId); //TODO метод поменяется на запрос к бэку
  // }
  //
  // // get data for buffer chart
  // public getAllBufferPersonsCardsByChartId(chartId: number): Array<IListChartItem> {
  //   return testData.bufferEmployees.filter(employee => employee.chartId == chartId); //TODO метод поменяется на запрос к бэку
  // }

  public getPersonsCards() {
    return this.http.get(this.api + '/api/personCard');
  }

  public login(userCredentials : FormData) {
    return this.http.post<ILoginInform>(this.api + '/login', userCredentials).pipe(shareReplay());
  }

  // register
  public addNewUser(userCredentials: FormData) {
    return this.http.post<IUserCredentials>(this.api + '/register', userCredentials).pipe(shareReplay());
  }

  public getUserCharts() {
    return this.http.get(this.api + '/api/chart');
  }

  public addNewChart(chartName: any) {
    return this.http.post(this.api + '/api/chart', {"chartName": chartName})
  }

  public addNewPersonCard(personCard: any) {
    return this.http.post(this.api + '/api/personCard', personCard);
  }

  public updatePersonCard(personCard: IListChartItem) {
    return this.http.put(this.api + '/api/personCard', personCard);
  }
}
