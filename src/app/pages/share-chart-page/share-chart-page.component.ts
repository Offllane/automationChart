import {Component, OnDestroy, OnInit} from '@angular/core';
import {IChartParams, IUser, IUserChart} from "../../models/interfaces";
import {ResourceService} from "../../services/resource.service";
import {ActivatedRoute} from "@angular/router";
import {Subject, Subscription} from "rxjs";
import {debounceTime} from "rxjs/operators";
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-share-chart-page',
  templateUrl: './share-chart-page.component.html',
  styleUrls: ['./share-chart-page.component.scss']
})
export class ShareChartPageComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  private searchSubject: Subject<string> = new Subject<string>();
  public usersList: Array<IUser> = [];
  public userChartsList: Array<IChartParams> = [];
  public currentChartId: number = 0;
  public currentChart: IChartParams | null = null;
  public currentSelectedUser: IUser | null = null;

  constructor(
    private resourceService: ResourceService,
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService
  ) { }

  ngOnInit(): void {
    this.getUserCharts();
    this.dataSubscription.add(this.activatedRoute.params.subscribe(params => {
      this.currentChartId = params.chartId;
    }));

    this.resourceService.getAllUsers().subscribe((data: Array<IUser>) => {
      this.usersList = data;
    });

    this.searchSubject.pipe(debounceTime(500)).subscribe(inputValue => {
      this.searchUsers(inputValue);
    });
  }

  private getUserCharts(): void {
    this.resourceService.getUserCharts().subscribe(((chartsList: Array<IChartParams>) => {
      this.userChartsList = chartsList;
      this.getChartById(this.currentChartId);
    }));
  }

  private getChartById(chartId: number) {
    this.currentChart = this.userChartsList.find(chart => chart.id == chartId) ?? null;
  }

  public selectUser(userId: number) {
    this.currentSelectedUser = this.usersList.find(user => user.id == userId) ?? null;
  }

  public addChartToUser(): void {
    if (!this.currentSelectedUser) { return; }
    this.loadingService.setIsLoading.next(true);
    const userChartData: IUserChart = {
      userId: this.currentSelectedUser?.id,
      chartId: this.currentChartId
    }

    this.resourceService.addChartToUser(userChartData).subscribe(() => {
      this.loadingService.setIsLoading.next(false);
    });
  }

  onSearchInputChange(target: any): void {
    this.searchSubject.next(target.value);
  }

  searchUsers(userLogin: string): void {
    this.resourceService.getUsersByLogin(userLogin).subscribe(usersList => {
      this.usersList = usersList;
    })
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
