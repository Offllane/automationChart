import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {PopupsService} from "../../services/popups.service";
import {Subscription} from "rxjs";
import {IListChartItem, IPopupConfig, IUser, IUserInGroup} from "../../models/interfaces";
import {ResourceService} from "../../services/resource.service";
import {HomeService} from "../../services/home.service";
import {ChartService} from "../../services/chart.service";
import {AdminService} from "../../services/admin.service";
import {FormBuilder, FormGroup} from "@angular/forms";

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
  public listForm: FormGroup = this.fb.group({
    id: [0],
    parentId: [null],
    chartId: [this.chartService.currentChartId],
    age: [''],
    birthDate: [''],
    city: [''],
    country: [''],
    department: [''],
    education: [''],
    firstName: [''],
    lastName: [''],
    passport: [''],
    patronymic: [''],
    phoneNumber: [''],
    position: [''],
    sex: ['']
  });

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
    private adminService: AdminService,
    private fb: FormBuilder
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

  public deleteChart(): void {
    console.log(this.popupConfig);
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

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
