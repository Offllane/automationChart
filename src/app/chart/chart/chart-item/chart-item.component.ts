import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {HomeService} from "../../../home/home.service";
import {TreeType} from "../../../models/types";
import {DragAndDropService} from "../../drag-and-drop.service";

@Component({
  selector: 'app-chart-item',
  templateUrl: './chart-item.component.html',
  styleUrls: ['./chart-item.component.scss']
})
export class ChartItemComponent implements OnInit, OnDestroy {
  public isAdditionalInformOpen = false;
  public treeType: TreeType = 'vertical';
  private dataSubscription: Subscription = new Subscription();
  @Input() employee: any = {
    id: 0,
    firstname: 'none',
    lastname: 'none',
    city: 'none',
    country: 'none',
    isHide: false,
    subordinates: []
  };

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
  }

  public onDragOver(event: any): void {
    event.preventDefault();
  }

  public onDrop(event: any): void {
    event.stopPropagation();
    this.dndService.dropPlaceholderItemId = this.employee.id;
    this.dndService.replaceItem();
  }

  ngOnDestroy() {
    this.dataSubscription.unsubscribe();
  }
}
