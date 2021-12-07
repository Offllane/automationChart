import {Component, Input, OnInit} from '@angular/core';
import {IListChartItem} from "../../models/interfaces";

@Component({
  selector: 'app-two-columns-list',
  templateUrl: './two-columns-list.component.html',
  styleUrls: ['./two-columns-list.component.scss']
})
export class TwoColumnsListComponent implements OnInit {
  @Input() isInformDisplaying = false;
  @Input() listInform: any;

  constructor() { }

  ngOnInit(): void {
  }

}
