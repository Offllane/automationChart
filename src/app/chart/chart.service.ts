import { Injectable } from '@angular/core';
import testData from '../models/testData.json';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChartService {
  public chartData: BehaviorSubject<any> = new BehaviorSubject(testData);

  constructor() {
  }
}
