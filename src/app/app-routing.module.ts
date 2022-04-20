import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./home/home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthGuardService, RoleGuardService} from "./services/auth-guard.service";
import {AdminPageComponent} from "./pages/admin-page/admin-page.component";
import {UpdateCardPageComponent} from "./pages/update-card-page/update-card-page.component";
import {CardPageComponent} from "./pages/card-page/card-page.component";
import {CreateCardPageComponent} from "./pages/create-card-page/create-card-page.component";
import {ShareChartPageComponent} from "./pages/share-chart-page/share-chart-page.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminPageComponent, canActivate: [RoleGuardService]},
  { path: 'chart', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'update-card/:cardId', component: UpdateCardPageComponent, canActivate: [AuthGuardService]},
  { path: 'create-card', component: CreateCardPageComponent, canActivate: [AuthGuardService]},
  { path: 'card/:cardId', component: CardPageComponent, canActivate: [AuthGuardService]},
  { path: 'share-chart/:chartId', component: ShareChartPageComponent, canActivate: [AuthGuardService]},
  { path: '**', component: HomeComponent, canActivate: [AuthGuardService]}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
