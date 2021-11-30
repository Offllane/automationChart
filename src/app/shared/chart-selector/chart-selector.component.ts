import { Component, OnInit } from '@angular/core';
import {ChartService} from "../../home/components/chart/chart.service";
import {IChartParams} from "../../models/interfaces";
import {ResourceService} from "../../services/resource.service";

@Component({
  selector: 'app-chart-selector',
  templateUrl: './chart-selector.component.html',
  styleUrls: ['./chart-selector.component.scss']
})
export class ChartSelectorComponent implements OnInit {
  public selectedChartId: number  = -1;
  public chartsArray: Array<IChartParams> = new Array<IChartParams>();

  constructor(
    private chartService: ChartService,
    private resourceService: ResourceService
  ) { }

  ngOnInit(): void {
    this.getAllChartsByUserId(1);
  }

  public onChartSelectChange(): void {
    this.chartService.currentChartId = this.selectedChartId;
    this.chartService.setAllEmployeeCardsByChartId(this.selectedChartId);
  }

  public getAllChartsByUserId(userId: number): void {
    this.chartsArray = this.resourceService.getChartsByUserId(userId);
  }

}
