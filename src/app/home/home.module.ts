import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule} from "../chart/chart.module";
import { HomeComponent } from './home/home.component';



@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
