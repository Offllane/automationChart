import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { TwoColumnsListComponent } from './two-columns-list/two-columns-list.component';
import { JsonFileInputComponent } from './json-file-input/json-file-input.component';
import { JsonFileExportComponent } from './json-file-export/json-file-export.component';
import { ChartSelectorComponent } from './chart-selector/chart-selector.component';
import { PopupComponent } from './popup/popup.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TwoColumnsListComponent,
    JsonFileInputComponent,
    JsonFileExportComponent,
    ChartSelectorComponent,
    PopupComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
  exports: [
    HeaderComponent,
    TwoColumnsListComponent,
    PopupComponent
  ]
})
export class SharedModule { }
