import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartService} from "../../home/components/chart/chart.service";
import {IChartParams, IListChartItem} from "../../models/interfaces";
import {ResourceService} from "../../services/resource.service";
import {Subscription} from "rxjs";
import {HomeService} from "../../home/home.service";

@Component({
  selector: 'app-chart-selector',
  templateUrl: './chart-selector.component.html',
  styleUrls: ['./chart-selector.component.scss']
})
export class ChartSelectorComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public selectedChartId: number  = -1;
  public chartsArray: Array<IChartParams> = new Array<IChartParams>();

  constructor(
    private chartService: ChartService,
    private resourceService: ResourceService,
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.homeService.getUserCharts();

    this.dataSubscription.add(this.homeService.usersChart.subscribe(usersCharts => {
      this.chartsArray = usersCharts;

      if(this.selectedChartId === -1) { // set first chart if user have one
        this.selectedChartId = this.chartsArray.length === 0 ? -1 : this.chartsArray[0].id;
      }
      this.onChartChange();
    }));
    this.onChartChange();
  }

  public onChartChange(): void {
    this.chartService.currentChartId = this.selectedChartId;
    const currentChartCards: Array<IListChartItem> | undefined = this.chartsArray.find(chart => chart.id == this.selectedChartId)?.personCard;
    if (currentChartCards) {
      this.chartService.setChartPersonCard(currentChartCards);
    }
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
