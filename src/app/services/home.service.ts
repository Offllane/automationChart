import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Subscription} from "rxjs";
import {Switch, TreeType} from "../models/types";
import {ResourceService} from "./resource.service";
import {IChartParams} from "../models/interfaces";

@Injectable({
  providedIn: 'root'
})
export class HomeService implements OnDestroy {
  private dataSubscription: Subscription = new Subscription();

  public treeType: BehaviorSubject<TreeType> = new BehaviorSubject<TreeType>('horizontal');
  public bufferState: BehaviorSubject<Switch> = new BehaviorSubject<Switch>('close');
  public usersChart: BehaviorSubject<Array<IChartParams>> = new BehaviorSubject<Array<IChartParams>>([]);
  public headerState: BehaviorSubject<Switch> = new BehaviorSubject<Switch>('open');

  constructor(
    private resourceService: ResourceService,
  ) { }

  public getUserCharts(): void {
    this.dataSubscription.add(
      this.resourceService.getUserCharts().subscribe((usersCharts: Array<IChartParams>) => {
        this.usersChart.next(usersCharts)
      }));
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
