import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule} from "../home/components/chart/chart.module";
import { LoginComponent} from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    ChartModule,
    FormsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
