import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {CloudinaryModule} from '@cloudinary/ng';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AuthModule } from "./auth/auth.module";
import { HomeModule } from "./home/home.module";
import {SharedModule} from "./shared/shared.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {AuthService} from "./services/auth.service";
import {AuthInterceptor} from "./auth/auth.interceptor";
import { AdminPageComponent } from './pages/admin-page/admin-page.component';
import { UpdateCardPageComponent } from './pages/update-card-page/update-card-page.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { CardPageComponent } from './pages/card-page/card-page.component';


@NgModule({
  declarations: [
    AppComponent,
    AdminPageComponent,
    UpdateCardPageComponent,
    PageNotFoundComponent,
    CardPageComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        CloudinaryModule,
        AppRoutingModule,
        AuthModule,
        HomeModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule
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
