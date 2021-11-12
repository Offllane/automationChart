import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule} from "../home/components/chart/chart.module";
import { LoginComponent} from "./login/login.component";


@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    ChartModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
