import {Component, OnDestroy, OnInit} from '@angular/core';
import {ChartService} from "../../home/components/chart/chart.service";
import {Subscription} from "rxjs";
import {IListChartItem} from "../../models/interfaces";
import {Router} from "@angular/router";

@Component({
  selector: 'app-add-item-page',
  templateUrl: './add-item-page.component.html',
  styleUrls: ['./add-item-page.component.scss']
})
export class AddItemPageComponent implements OnInit, OnDestroy {
  private dataSubscription: Subscription = new Subscription();
  private bufferEmployeeList: Array<IListChartItem> = [];
  private employeeList: Array<IListChartItem> = [];
  public listForm: IListChartItem = {
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
    this.dataSubscription.add(this.chartService.listChartData.subscribe((data: Array<IListChartItem>) => {
      this.employeeList = data;
    }));
    this.dataSubscription.add(this.chartService.bufferListChartData.subscribe((data: Array<IListChartItem>) => {
      this.bufferEmployeeList = data;
    }));
  }

  public addItem(): void {
    const maxCurrentId = this.chartService.findMaxIdInEmployeeList();
    this.listForm.id = maxCurrentId + 1;
    this.employeeList.length === 0 ? this.addItemToMainList(this.listForm) : this.addItemToBuffer(this.listForm);
    this.router.navigate(['/home']);
  }

  private addItemToMainList(listChartItem: IListChartItem): void {
    this.employeeList.push(listChartItem);
    this.chartService.listChartData.next(this.employeeList);
  }

  private addItemToBuffer(listChartItem: IListChartItem): void {
    this.bufferEmployeeList.push(listChartItem);
    this.chartService.bufferListChartData.next(this.bufferEmployeeList);
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }
}
