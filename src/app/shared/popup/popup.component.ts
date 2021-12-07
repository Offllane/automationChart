import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PopupsService} from "../../services/popups.service";
import {Subscription} from "rxjs";
import {IListChartItem, IPopupConfig, IUser, IUserInGroup} from "../../models/interfaces";
import {ResourceService} from "../../services/resource.service";
import {HomeService} from "../../home/home.service";
import {ChartService} from "../../home/components/chart/chart.service";
import {AdminService} from "../../pages/admin-page/admin.service";

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
  public addGroupPopupData = {
    groupName: ''
  }
  public usersAccount: Array<IUser> = [];

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

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
