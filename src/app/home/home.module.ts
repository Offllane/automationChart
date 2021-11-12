import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule} from "./components/chart/chart.module";
import { SharedModule} from "../shared/shared.module";
import { HomeComponent } from './home/home.component';
import { BufferComponent } from './components/buffer/buffer.component';



@NgModule({
  declarations: [
    HomeComponent,
    BufferComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    SharedModule
  ],
  exports: [
    HomeComponent
  ]
})
export class HomeModule { }
