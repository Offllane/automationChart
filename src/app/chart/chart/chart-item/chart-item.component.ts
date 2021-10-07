import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HomeService} from "../../../home/home.service";
import {TreeType} from "../../../models/types";

@Component({
  selector: 'app-chart-item',
  templateUrl: './chart-item.component.html',
  styleUrls: ['./chart-item.component.scss']
})
export class ChartItemComponent implements OnInit, OnDestroy {
  public treeType: TreeType = 'vertical';
  private dataSubscription: Subscription = new Subscription();
  @Input() employee: any = {
    firstname: 'none',
    lastname: 'none'
  };

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.homeService.treeType.subscribe((data: TreeType) => {
      this.treeType = data;
    }))
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }

}
