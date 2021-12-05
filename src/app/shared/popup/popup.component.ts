import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PopupsService} from "../../services/popups.service";
import {Subscription} from "rxjs";
import {IPopupConfig} from "../../models/interfaces";
import {ResourceService} from "../../services/resource.service";
import {HomeService} from "../../home/home.service";

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

  public addChartPopupData = {
    chartName: ''
  }

  constructor(
    private popupService: PopupsService,
    private resourceService: ResourceService,
    private homeService: HomeService
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

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
