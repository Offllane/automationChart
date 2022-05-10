import {Component, OnDestroy, OnInit} from '@angular/core';
import {PopupsService} from "../../services/popups.service";
import {Subscription} from "rxjs";
import {IChartParams, IPopupConfig, IUser} from "../../models/interfaces";
import {ResourceService} from "../../services/resource.service";
import {HomeService} from "../../services/home.service";
import {ChartService} from "../../services/chart.service";
import {AdminService} from "../../services/admin.service";
import {Switch} from "../../models/types";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public isPopupOpen = true;
  public popupConfig : IPopupConfig = {
    popupTitle: 'Add new chart',
    popupMode: 'addChart',
    popupInform: {}
  }
  public addChartPopupData = {
    chartName: ''
  }
  public addGroupPopupData = {
    groupName: ''
  }
  public usersAccount: Array<IUser> = [];
  public chartsArray: Array<IChartParams> = new Array<IChartParams>();
  public selectedChartName: string = 'Выберите схему';
  public dropDownState: Switch = 'close';
  public selectedChart: IChartParams | null = null;

  constructor(
    private popupService: PopupsService,
    private resourceService: ResourceService,
    private homeService: HomeService,
    private chartService: ChartService,
    private adminService: AdminService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.popupService.popupState.subscribe((popupState: IPopupConfig | null) => {
      if (popupState) {
        this.isPopupOpen = true;
        this.popupConfig = popupState;
        this.chartsArray = this.popupConfig?.popupInform?.chartsArray;

        if (popupState.popupMode === 'addUserToGroup') {
          this.resourceService.getAllUsers().subscribe((data: Array<IUser>) => {
            this.usersAccount = data;
          });
        }
      } else {
        this.isPopupOpen = false;
      }
    }));
  }

  public closePopup(): void {
    this.addChartPopupData.chartName = '';
    this.addGroupPopupData.groupName = '';
    this.isPopupOpen = false;
    this.popupService.popupState.next(null);
  }

  public createNewChart() {
    this.dataSubscription.add(this.resourceService.addNewChart(this.addChartPopupData.chartName).subscribe(() => {
      this.homeService.getUserCharts();
    }));
    this.closePopup();
  }

  public renameChart(): void {
    const dataForRequest = {
      Id: this.popupConfig.popupInform.chartId,
      chartName: this.addChartPopupData.chartName
    }
    this.dataSubscription.add(this.resourceService.renameChart(dataForRequest).subscribe(() => {
      this.homeService.getUserCharts();
    }));
    this.closePopup();
  }

  public deleteChart(): void {
    this.dataSubscription.add(this.resourceService.deleteChart(this.popupConfig.popupInform.chartId).subscribe(() => {
      this.homeService.getUserCharts();
    }, () => {
      this.homeService.getUserCharts();
    }));
    this.closePopup();
  }

  public deletePersonCard(): void {
     this.resourceService.deletePersonCard(this.popupConfig.popupInform.cardId).subscribe(() => {
        this.homeService.getUserCharts();
     },
       () => {
         this.homeService.getUserCharts();
       });
     this.closePopup();
  }

  public createNewGroup(): void {
    this.resourceService.addNewGroup(this.addGroupPopupData.groupName).subscribe(data => {
      this.adminService.getAllGroups();
    });
    this.closePopup();
  }

  public addUserToGroup(userId: number) {
    this.adminService.userIdToAddingToGroup.next(userId);
    this.closePopup();
  }

  public openDropDown(): void {
    this.dropDownState = this.dropDownState === 'open' ? 'close' : 'open';
  }

  public onChartChange(chart: IChartParams): void {
    this.selectedChart = chart;
    this.selectedChartName = chart.chartName;
    this.dropDownState = 'close';
  }

  copyChartToAnotherChart(startChartId: number, endChartId: number | undefined): void {
    if (endChartId != null) {
      this.resourceService.copyChart(startChartId, endChartId).subscribe(data => {
        this.homeService.getUserCharts();
      });
    }
    this.closePopup();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
