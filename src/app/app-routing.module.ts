import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./home/home/home.component";
import {LoginComponent} from "./auth/login/login.component";
import {AddItemPageComponent} from "./pages/add-item-page/add-item-page.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'add-item', component: AddItemPageComponent},
  { path: '**', component: HomeComponent }
]


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
