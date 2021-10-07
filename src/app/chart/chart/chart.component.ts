import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartService} from "../chart.service";
import {HomeService} from "../../home/home.service";
import {Subscription} from "rxjs";
import {TreeType} from "../../models/types";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  public employeesArray: any;
  public treeType: TreeType = 'vertical';
  private dataSubscription: Subscription = new Subscription();

  constructor(
    private chartService: ChartService,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.chartService.chartData.subscribe(data => {
      this.employeesArray = data.employees;
    }));
    this.dataSubscription.add(this.homeService.treeType.subscribe((data: TreeType) => {
      this.treeType = data;
    }));
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

}
