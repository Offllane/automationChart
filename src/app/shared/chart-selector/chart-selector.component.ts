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
    this.dataSubscription.add(this.homeService.usersChart.subscribe((userCharts: Array<IChartParams>) => {
      if (!userCharts) { return; }
      this.chartsArray = userCharts;
      const selectedChart = userCharts.find(chart => chart.id === this.chartService.currentSelectedChartId) ?? null;
      this.selectChart(selectedChart);
    }));
    this.dataSubscription.add(this.popupService.popupState.subscribe(() => {
      this.dropDownState = 'close';
    }));

    this.homeService.getUserCharts();
  }

  public toggleDropDown(): void {
    this.dropDownState = this.dropDownState === 'open' ? 'close' : 'open';
  }

  public closeDropDown(): void {
    this.dropDownState = 'close';
  }

  public selectChart(selectedChart: IChartParams | null): void {
    this.chartService.currentSelectedChartId = selectedChart?.id ?? 0;
    this.setSelectedChartName(selectedChart?.chartName);
    this.chartService.setChartPersonCard(selectedChart?.personCard ?? []);
    this.closeDropDown();
  }

  public setSelectedChartName(chartName: string | undefined | null) {
    this.selectedChartName = chartName ?? 'Выберите схему';
  }

  public openShareChartPage(chartId: number): void {
    this.router.navigate([`/share-chart/${chartId}`])
  }

  public openRenameChartPopup(chart: IChartParams): void {
    this.popupService.popupState.next({
      popupTitle: `Переименовать схему ${chart.chartName}`,
      popupMode: 'renameChart',
      popupInform: { chartId: chart.id }
    })
  }

  public openDeleteChartConfirmationPopup(chartId: number): void {
    this.popupService.popupState.next({
      popupTitle: 'Вы уверены, что хотите удалить схему?',
      popupMode: 'deleteChartConfirmation',
      popupInform: { chartId: chartId }
    })
  }

  public openCopyChartPopup(chart: IChartParams): void {
    this.popupService.popupState.next({
      popupTitle: `Перенести схему "${chart.chartName}" в другую схему`,
      popupMode: 'copyChart',
      popupInform: { chartId: chart.id, chartsArray: this.chartsArray }
    })
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
