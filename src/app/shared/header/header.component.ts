import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {HomeService} from "../../services/home.service";
import {Switch, TreeType} from "../../models/types";
import {Router} from "@angular/router";
import {ChartService} from "../../services/chart.service";
import {Subscription} from "rxjs";
import {IListChartItem, IPermissionList, IPopupConfig} from "../../models/interfaces";
import {PopupsService} from "../../services/popups.service";
import {AuthService} from "../../services/auth.service";
import {CreateImageService} from "../../services/create-image.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public isAdmin = this.authService.isCurrentUserAdmin();
  public bufferItemCounter: number = 0;
  public treeType: TreeType = 'horizontal';
  public bufferState: Switch = 'close';
  public headerState: Switch = 'open';
  public popupConfig: IPopupConfig | null = null;
  public permissionList: IPermissionList = {
    canDownload: false,
    canReadAddress: false,
    canReadPassportData: false,
    canUpload: false,
    id: 0
  };
  @Input() mode = 'home';
  @HostListener('window:scroll', ['$event'])
  scrollEvent() {
    this.onScroll();
  }

  constructor(
    private homeService: HomeService,
    private chartService: ChartService,
    private popupService: PopupsService,
    private authService: AuthService,
    private createImageService: CreateImageService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.homeService.treeType.subscribe((data: TreeType) => {
      this.treeType = data;
    }));
    this.dataSubscription.add(this.homeService.bufferState.subscribe((bufferState: Switch) => {
      this.bufferState = bufferState;
    }));
    this.dataSubscription.add(this.chartService.bufferListChartData.subscribe((data: Array<IListChartItem>) => {
      this.bufferItemCounter = data.length;
    }));
    this.dataSubscription.add(this.popupService.popupState.subscribe((popupState: IPopupConfig | null) => {
      this.popupConfig = popupState;
    }));
    this.dataSubscription.add(this.authService.accountPermission.subscribe((data: IPermissionList) => {
      this.permissionList = data;
    }));
    this.dataSubscription.add(this.homeService.headerState.subscribe((state: Switch) => {
      this.headerState = state;
    }));
  }

  public switchTreeType(treeType: TreeType) {
    this.homeService.treeType.next(treeType);
  }

  public goToMainPage(): void {
    this.router.navigate(['/home']);
  }

  public toggleBuffer(): void {
    this.bufferState = this.bufferState === 'open' ? 'close' : 'open';
    this.homeService.bufferState.next(this.bufferState);
  }

  public openAddChartPopup(): void {
    this.popupService.popupState.next({
      popupTitle: 'Добавить новую схему',
      popupMode: "addChart"
    });
  }

  public openAddPersonCardPopup(): void {
    this.router.navigate(['create-card']);
  }

  public openAddGroupPopup(): void {
    this.popupService.popupState.next({
      popupTitle: 'Добавить группу',
      popupMode: "addGroup"
    });
  }

  public goToAdminPage() {
    this.router.navigate(['/admin']);
  }

  public logout(): void {
    this.homeService.bufferState.next('close');
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public onScroll():void {
    if (window.scrollY > 100) {
      this.headerState = 'close';
    } else {
      this.headerState = 'open';
    }
  }

  public createImage(): void {
    this.createImageService.createImage();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
