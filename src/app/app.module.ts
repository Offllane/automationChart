import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from "./auth/auth.module";
import { HomeModule } from "./home/home.module";
import {SharedModule} from "./shared/shared.module";
import {FormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {AuthInterceptor} from "./auth/auth.interceptor";
import { AdminPageComponent } from './pages/admin-page/admin-page.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        AuthModule,
        HomeModule,
        SharedModule,
        FormsModule
    ],
  providers: [
    AuthService, {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
