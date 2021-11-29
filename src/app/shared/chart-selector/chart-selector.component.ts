import { Component, OnInit } from '@angular/core';
import {ChartService} from "../../home/components/chart/chart.service";

@Component({
  selector: 'app-chart-selector',
  templateUrl: './chart-selector.component.html',
  styleUrls: ['./chart-selector.component.scss']
})
export class ChartSelectorComponent implements OnInit {
  public selectedChartId: number  = -1;

  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
  }

  public onChartSelectChange(): void {
    this.chartService.currentChartId = this.selectedChartId;
    this.chartService.setAllEmployeeCardsByChartId(this.selectedChartId);
  }

}
