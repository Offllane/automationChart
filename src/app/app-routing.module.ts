import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./home/home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AddItemPageComponent} from "./pages/add-item-page/add-item-page.component";
import {AuthGuardService} from "./auth/auth-guard.service";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'add-item', component: AddItemPageComponent, canActivate: [AuthGuardService]},
  { path: '**', component: HomeComponent, canActivate: [AuthGuardService] }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
