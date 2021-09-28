import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { ChartItemComponent } from './chart/chart-item/chart-item.component';



@NgModule({
  declarations: [
    ChartComponent,
    ChartItemComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ChartComponent
  ]
})
export class ChartModule { }
