import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartService} from "../../home/components/chart/chart.service";
import {Subscription} from "rxjs";
import {listChartItem} from "../../models/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-item-page',
  templateUrl: './add-item-page.component.html',
  styleUrls: ['./add-item-page.component.scss']
})
export class AddItemPageComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  private bufferEmployeeList: Array<listChartItem> = [];
  private employeeList: Array<listChartItem> = [];
  public listForm: listChartItem = {
    id: 0,
    parentId: null,
    chartId: this.chartService.currentChartId,
    age: 0,
    birthDate: "",
    city: "",
    country: "",
    department: "",
    education: "",
    firstName: "",
    lastName: "",
    passport: "",
    patronymic: "",
    phoneNumber: "",
    position: "",
    sex: "",
    photo: undefined
  }

  constructor(
    private chartService: ChartService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataSubscription.add(this.chartService.listChartData.subscribe((data: Array<listChartItem>) => {
      this.employeeList = data;
    }));
    this.dataSubscription.add(this.chartService.bufferListChartData.subscribe((data: Array<listChartItem>) => {
      this.bufferEmployeeList = data;
    }));
  }

  public addItem(): void {
    const maxCurrentId = this.chartService.findMaxIdInEmployeeList();
    this.listForm.id = maxCurrentId + 1;
    this.employeeList.length === 0 ? this.addItemToMainList(this.listForm) : this.addItemToBuffer(this.listForm);
    this.router.navigate(['/home']);
  }

  private addItemToMainList(listChartItem: listChartItem): void {
    this.employeeList.push(listChartItem);
    this.chartService.listChartData.next(this.employeeList);
  }

  private addItemToBuffer(listChartItem: listChartItem): void {
    this.bufferEmployeeList.push(listChartItem);
    this.chartService.bufferListChartData.next(this.bufferEmployeeList);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
