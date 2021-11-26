import {Component, OnDestroy, OnInit} from '@angular/core';
import { saveAs } from 'file-saver';
import {Subscription} from "rxjs";
import {listChartItem} from "../../models/interfaces";
import {ChartService} from "../../home/components/chart/chart.service";

@Component({
  selector: 'app-json-file-export',
  templateUrl: './json-file-export.component.html',
  styleUrls: ['./json-file-export.component.scss']
})
export class JsonFileExportComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  private dataForExport: any = {
    "employees": [],
    "bufferEmployees": []
  };

  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.chartService.listChartData.subscribe((data: Array<listChartItem>) => {
      this.dataForExport.employees = data;
    }));
    this.dataSubscription.add(this.chartService.bufferListChartData.subscribe((data: Array<listChartItem>) => {
      this.dataForExport.bufferEmployees = data;
    }));
  }

  exportJsonFile(): void {
    let blob = new Blob([JSON.stringify(this.dataForExport)], {type: "text/plain;charset=utf-8"});
    saveAs(blob, "chart.json");
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

}
