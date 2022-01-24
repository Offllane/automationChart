import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule} from "../home/components/chart/chart.module";
import { LoginComponent} from "./login/login.component";
import { RegisterComponent } from './register/register.component';
import {FormsModule} from "@angular/forms";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent
  ],
    imports: [
        CommonModule,
        ChartModule,
        FormsModule,
        SharedModule
    ],
  exports: [
    LoginComponent
  ]
})
export class AuthModule { }
