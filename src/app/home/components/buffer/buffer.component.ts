import { Component, OnInit } from '@angular/core';
import {Switch} from "../../../models/types";
import {Subscription} from "rxjs";
import {HomeService} from "../../home.service";

@Component({
  selector: 'app-buffer',
  templateUrl: './buffer.component.html',
  styleUrls: ['./buffer.component.scss']
})
export class BufferComponent implements OnInit {
  private dataSubscription: Subscription = new Subscription();
  public bufferState: Switch = 'close';
  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.homeService.bufferState.subscribe((state: Switch) => {
      this.bufferState = state;
    }))
  }

}
