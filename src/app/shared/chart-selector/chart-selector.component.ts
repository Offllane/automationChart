import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartService} from "../../services/chart.service";
import {IChartParams, IListChartItem} from "../../models/interfaces";
import {ResourceService} from "../../services/resource.service";
import {Subscription} from "rxjs";
import {HomeService} from "../../services/home.service";
import {Switch} from "../../models/types";
import {PopupsService} from "../../services/popups.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chart-selector',
  templateUrl: './chart-selector.component.html',
  styleUrls: ['./chart-selector.component.scss']
})
export class ChartSelectorComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public chartsArray: Array<IChartParams> = new Array<IChartParams>();
  public selectedChartName: string = 'Выберите схему';
  public dropDownState: Switch = 'close';

  constructor(
    private chartService: ChartService,
    private resourceService: ResourceService,
    private homeService: HomeService,
    private popupService: PopupsService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.homeService.getUserCharts();

    this.dataSubscription.add(this.homeService.usersChart.subscribe(usersCharts => {
      this.chartsArray = usersCharts;
      if (this.chartsArray.length !== 0) { this.onChartChange(this.chartsArray[0].id); }
    }));
    this.dataSubscription.add(this.popupService.popupState.subscribe(() => {
      this.dropDownState = 'close';
    }));
  }

  public openDropDown(): void {
    this.dropDownState = this.dropDownState === 'open' ? 'close' : 'open';
  }

  public onChartChange(selectedChartId: number): void {
    this.chartService.currentChartId = selectedChartId;
    this.selectedChartName = this.chartsArray.find(chart => chart.id === selectedChartId)?.chartName ?? 'Выберите схему';
    const currentChartCards: Array<IListChartItem> | undefined = this.chartsArray.find(chart => chart.id == selectedChartId)?.personCard;
    if (currentChartCards) {
      this.chartService.setChartPersonCard(currentChartCards);
    }
    this.dropDownState = 'close';
  }

  public openDeleteChartConfirmationPopup(chartId: number): void {
    this.popupService.popupState.next({
      popupTitle: 'Вы уверены, что хотите удалить схему?',
      popupMode: 'deleteChartConfirmation',
      popupInform: { chartId: chartId }
    })
  }

  public openShareChartPage(chartId: number): void {
    this.router.navigate(['/share-chart/' + chartId])
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
