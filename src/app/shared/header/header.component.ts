import { Component, OnInit } from '@angular/core';
import {HomeService} from "../../home/home.service";
import {Switch, TreeType} from "../../models/types";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public treeType: TreeType = 'horizontal';
  public bufferState: Switch = 'close';

  constructor(
    private homeService: HomeService,
  ) { }

  ngOnInit(): void {
    this.homeService.treeType.subscribe((data: TreeType) => {
      this.treeType = data;
    })
  }

  public switchTreeType(treeType: TreeType) {
    this.homeService.treeType.next(treeType);
  }

  public toggleBuffer(): void {
    this.bufferState = this.bufferState === 'open' ? 'close' : 'open';
    this.homeService.bufferState.next(this.bufferState);
  }
}
