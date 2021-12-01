import {Component, OnDestroy, OnInit} from '@angular/core';
import {PopupsService} from "../../services/popups.service";
import {Subscription} from "rxjs";
import {IPopupConfig} from "../../models/interfaces";
import {ResourceService} from "../../services/resource.service";

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
  private currentMaxId = 3; // TODO remove после подключения к бэку

  public addChartPopupData = {
    chartName: ''
  }

  constructor(
    private popupService: PopupsService,
    private resourceService: ResourceService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.popupService.popupState.subscribe((popupState: IPopupConfig | null) => {
      if (popupState) {
        this.isPopupOpen = true;
        this.popupConfig = popupState;
      } else {
        this.closePopup();
      }
    }));
  }

  public closePopup(): void {
    this.isPopupOpen = false;
  }

  public createNewChart() {
      console.log(this.addChartPopupData); // TODO запрос на добавление нового чарта текущему юзеру
      this.currentMaxId = this.currentMaxId++; // TODO удалится после подключенгия к бэку чартов
      this.resourceService.chartsData.next({ // TODO удалится после подключенгия к бэку чартов
        chartId: this.currentMaxId,
        userId: 1,
        chartName: this.addChartPopupData.chartName})
       this.closePopup();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
