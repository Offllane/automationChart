import {Component, HostListener, Input, OnDestroy, OnInit} from '@angular/core';
import {HomeService} from "../../home/home.service";
import {Switch, TreeType} from "../../models/types";
import {Router} from "@angular/router";
import {ChartService} from "../../home/components/chart/chart.service";
import {Subscription} from "rxjs";
import {IListChartItem, IPopupConfig} from "../../models/interfaces";
import {PopupsService} from "../../services/popups.service";
import {AuthService} from "../../auth/auth.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public bufferItemCounter: number = 0;
  public treeType: TreeType = 'horizontal';
  public bufferState: Switch = 'close';
  public headerState: Switch = 'open';
  public popupConfig: IPopupConfig | null = null;
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.homeService.treeType.subscribe((data: TreeType) => {
      this.treeType = data;
    }));
    this.dataSubscription.add(this.chartService.bufferListChartData.subscribe((data: Array<IListChartItem>) => {
      this.bufferItemCounter = data.length;
    }));
    this.dataSubscription.add(this.popupService.popupState.subscribe((popupState: IPopupConfig | null) => {
      this.popupConfig = popupState;
    }));
  }

  public switchTreeType(treeType: TreeType) {
    this.homeService.treeType.next(treeType);
  }

  public goToAddItemPage(): void {
    this.router.navigate(['/add-item']);
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
      popupTitle: 'Create new chart',
      popupMode: "addChart"
    });
  }

  public openAddPersonCardPopup(): void {
    this.popupService.popupState.next({
      popupTitle: 'Add new Person',
      popupMode: "addPersonCard"
    });
  }

  public logout(): void {
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

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
