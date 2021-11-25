import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from "./auth/auth.module";
import { HomeModule } from "./home/home.module";
import { AddItemPageComponent } from './pages/add-item-page/add-item-page.component';
import {SharedModule} from "./shared/shared.module";
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    AppComponent,
    AddItemPageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        HomeModule,
        SharedModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
