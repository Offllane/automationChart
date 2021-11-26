import { Component, OnInit } from '@angular/core';
import {ChartService} from "../../home/components/chart/chart.service";

@Component({
  selector: 'app-json-file-input',
  templateUrl: './json-file-input.component.html',
  styleUrls: ['./json-file-input.component.scss']
})
export class JsonFileInputComponent implements OnInit {

  constructor(
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
  }

  onImport(event: any): void {
    let file = event.srcElement.files[0];
    if (file) {
      let data;
      let reader = new FileReader();
      reader.readAsText(file, "UTF-8");
      reader.onload = evt => {
        if (evt?.target?.result) {
          data = JSON.parse(evt?.target?.result.toString());
          this.chartService.listChartData.next(data.employees);
          this.chartService.bufferListChartData.next(data.bufferEmployees);
        }
      };
      reader.onerror = function (evt) {
        console.log('error reading file');
      }

      function check(evt: any) {

      }
    }
  }
}
