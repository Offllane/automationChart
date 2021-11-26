import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {FormsModule} from "@angular/forms";
import { TwoColumnsListComponent } from './two-columns-list/two-columns-list.component';
import { JsonFileInputComponent } from './json-file-input/json-file-input.component';
import { JsonFileExportComponent } from './json-file-export/json-file-export.component';



@NgModule({
  declarations: [
    HeaderComponent,
    TwoColumnsListComponent,
    JsonFileInputComponent,
    JsonFileExportComponent
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
