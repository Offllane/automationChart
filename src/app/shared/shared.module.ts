import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {FormsModule} from "@angular/forms";
import { TwoColumnsListComponent } from './two-columns-list/two-columns-list.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TwoColumnsListComponent
  ],
    imports: [
        CommonModule,
        FormsModule
    ],
    exports: [
        HeaderComponent,
        TwoColumnsListComponent
    ]
})
export class SharedModule { }
