import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HomeService} from "../../../../../services/home.service";
import {TreeType} from "../../../../../models/types";
import {DragAndDropService} from "../../../../../services/drag-and-drop.service";
import {ITreeChartItem} from "../../../../../models/interfaces";

@Component({
  selector: 'app-chart-item',
  templateUrl: './chart-item.component.html',
  styleUrls: ['./chart-item.component.scss']
})
export class ChartItemComponent implements OnInit, OnDestroy {
  public isAdditionalInformOpen = false;
  public treeType: TreeType = 'vertical';
  private dataSubscription: Subscription = new Subscription();
  @Input() employee: ITreeChartItem = {
    parentId: -1, // init value
    chartId: -1,
    id: -1, // init value
    firstName: 'none',
    lastName: 'none',
    city: 'none',
    country: 'none',
    age: -1, // init value
    isHide: false,
    subordinates: []
  };
  @Input() isBufferChartItem = false;

  constructor(
    private homeService: HomeService,
    private dndService: DragAndDropService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.homeService.treeType.subscribe((data: TreeType) => {
      this.treeType = data;
    }))
  }

  public toggleAdditionalInform() {
    this.isAdditionalInformOpen = !this.isAdditionalInformOpen;
  }

  public onDragStart(event: any): void {
    event.stopPropagation();
    this.dndService.draggedItemId = this.employee.id;
    this.dndService.isDraggedItemFromBuffer = this.isBufferChartItem;
  }

  public onDragOver(event: any): void {
    event.preventDefault();
  }

  public onDrop(event: any): void {
    event.stopPropagation();
    this.dndService.dropPlaceholderItemId = this.employee.id;
    this.dndService.replaceItemToNewPosition(this.isBufferChartItem);
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
