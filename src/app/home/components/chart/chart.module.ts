import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartComponent } from './chart/chart.component';
import { ChartItemComponent } from './chart/chart-item/chart-item.component';
import {SharedModule} from "../../../shared/shared.module";



@NgModule({
  declarations: [
    ChartComponent,
    ChartItemComponent
  ],
    imports: [
        CommonModule,
        SharedModule
    ],
  exports: [
    ChartComponent
  ]
})
export class ChartModule { }
