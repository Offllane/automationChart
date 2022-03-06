import {Component, OnDestroy, OnInit} from '@angular/core';
import {Switch} from "../../../models/types";
import {Subscription} from "rxjs";
import {HomeService} from "../../../services/home.service";
import {DragAndDropService} from "../../../services/drag-and-drop.service";

@Component({
  selector: 'app-buffer',
  templateUrl: './buffer.component.html',
  styleUrls: ['./buffer.component.scss']
})
export class BufferComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  public bufferState: Switch = 'close';
  public isShowDropIcon = false;

  constructor(
    private homeService: HomeService,
    private dndService: DragAndDropService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.homeService.bufferState.subscribe((state: Switch) => {
      this.bufferState = state;
    }));
  }

  public onDragOver(event: any): void {
    event.preventDefault();
    this.isShowDropIcon = true;
  }

  public onDragLeave(event: any): void {
    event.preventDefault();
    this.isShowDropIcon = false;
  }

  onDrop(event: any): void {
    event.stopPropagation();
    this.dndService.dropPlaceholderItemId = null;
    this.dndService.replaceItemToNewPosition(true);
    this.isShowDropIcon = false;
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
