import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HomeService} from "../../home/home.service";
import {Switch, TreeType} from "../../models/types";
import {Router} from "@angular/router";
import {ChartService} from "../../home/components/chart/chart.service";
import {Subscription} from "rxjs";
import {listChartItem} from "../../models/interfaces";

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
  @Input() mode = 'home';

  constructor(
    private homeService: HomeService,
    private chartService: ChartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.homeService.treeType.subscribe((data: TreeType) => {
      this.treeType = data;
    }));
    this.dataSubscription.add(this.chartService.bufferListChartData.subscribe((data: Array<listChartItem>) => {
      this.bufferItemCounter = data.length;
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

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
