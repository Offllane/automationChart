import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./home/home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {RegisterComponent} from "./auth/register/register.component";
import {AuthGuardService, RoleGuardService} from "./services/auth-guard.service";
import {AdminPageComponent} from "./pages/admin-page/admin-page.component";
import {PageNotFoundComponent} from "./pages/page-not-found/page-not-found.component";
import {UpdateCardPageComponent} from "./pages/update-card-page/update-card-page.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'admin', component: AdminPageComponent, canActivate: [RoleGuardService]},
  { path: 'chart', component: HomeComponent, canActivate: [AuthGuardService]},
  { path: 'update-card/:cardId', component: UpdateCardPageComponent, canActivate: [AuthGuardService]},
  { path: '**', component: PageNotFoundComponent}
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
