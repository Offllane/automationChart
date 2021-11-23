import {Component, Input, OnInit} from '@angular/core';
import {listChartItem} from "../../models/interfaces";

@Component({
  selector: 'app-two-columns-list',
  templateUrl: './two-columns-list.component.html',
  styleUrls: ['./two-columns-list.component.scss']
})
export class TwoColumnsListComponent implements OnInit {
  @Input() isInformDisplaying = false;
  @Input() listInform = {};
  public listInformForAdditionalChartItemArea: listChartItem = {} as listChartItem;

  constructor() { }

  ngOnInit(): void {
    this.listInformForAdditionalChartItemArea = {
      age: 0, city: "", country: "", firstName: "", id: 0, lastName: "", parentId: null

    }
  }

}
