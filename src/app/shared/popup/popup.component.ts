import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PopupsService} from "../../services/popups.service";
import {Subscription} from "rxjs";
import {IListChartItem, IPopupConfig} from "../../models/interfaces";
import {ResourceService} from "../../services/resource.service";
import {HomeService} from "../../home/home.service";
import {ChartService} from "../../home/components/chart/chart.service";

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
    popupMode: 'addChart'
  }
  public listForm: IListChartItem = {
    id: 0,
    parentId: null,
    chartId: this.chartService.currentChartId,
    age: 0,
    birthDate: "",
    city: "",
    country: "",
    department: "",
    education: "",
    firstName: "",
    lastName: "",
    passport: "",
    patronymic: "",
    phoneNumber: "",
    position: "",
    sex: ""
  }

  public addChartPopupData = {
    chartName: ''
  }

  constructor(
    private popupService: PopupsService,
    private resourceService: ResourceService,
    private homeService: HomeService,
    private chartService: ChartService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.popupService.popupState.subscribe((popupState: IPopupConfig | null) => {
      if (popupState) {
        this.isPopupOpen = true;
        this.popupConfig = popupState;
      } else {
        this.isPopupOpen = false;
      }
    }));
  }

  public closePopup(): void {
    this.isPopupOpen = false;
    this.popupService.popupState.next(null);
  }

  public createNewChart() {
    this.dataSubscription.add(this.resourceService.addNewChart(this.addChartPopupData.chartName).subscribe(() => {
      this.homeService.getUserCharts();
    }));
    this.closePopup();
  }

  public createNewPersonCard(): void {
    this.listForm.chartId = this.chartService.currentChartId;
    const { id, ...newCard} = this.listForm;
    this.dataSubscription.add(this.resourceService.addNewPersonCard(newCard).subscribe(() => {
      this.homeService.getUserCharts();
    }));
    this.closePopup();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
