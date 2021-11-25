import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {ChartService} from "../chart.service";
import {HomeService} from "../../../home.service";
import {Subscription} from "rxjs";
import {ChartMode, TreeType} from "../../../../models/types";
import {treeChartItem} from "../../../../models/interfaces";
import {DragAndDropService} from "../drag-and-drop.service";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
  public employeesArray: Array<treeChartItem> = [];
  public treeType: TreeType = 'vertical';
  private dataSubscription: Subscription = new Subscription();

  @Input() chartMode: ChartMode = 'main'; // by default
  public isBufferChart = false;

  constructor(
    private chartService: ChartService,
    private homeService: HomeService,
    private dndService: DragAndDropService
  ) { }

  ngOnInit(): void {
    this.isBufferChart = this.chartMode === 'buffer';
    switch (this.chartMode) {
      case 'main':
        this.dataSubscription.add(this.chartService.treeChartData.subscribe((data: Array<treeChartItem>) => {
          this.employeesArray = data;
        }));
        break;
      case 'buffer':
        this.dataSubscription.add(this.chartService.bufferTreeChartData.subscribe((data: Array<treeChartItem>) => {
          this.employeesArray = data;
        }));
      break;
      default:
        console.warn('incorrect chartMode');
        break
    }

    this.dataSubscription.add(this.homeService.treeType.subscribe((data: TreeType) => {
      this.treeType = data;
    }));
  }

  onDrop(event: any) {
    event.stopPropagation();
    this.dndService.dropPlaceholderItemId = null;
    this.dndService.replaceItemToNewPosition(false, true);
  }

  onDragOver(event: any): void {
    event.preventDefault();
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

}
