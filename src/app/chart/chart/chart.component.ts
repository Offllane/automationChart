import { Component, OnInit } from '@angular/core';
import {ChartService} from "../chart.service";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  public employeesArray: any;

  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.chartService.chartData.subscribe(data => {
      this.employeesArray = data.employees;
    })
  }

}
