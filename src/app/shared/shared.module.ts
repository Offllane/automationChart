import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { JsonFileInputComponent } from './json-file-input/json-file-input.component';
import { JsonFileExportComponent } from './json-file-export/json-file-export.component';
import { ChartSelectorComponent } from './chart-selector/chart-selector.component';
import { PopupComponent } from './popup/popup.component';
import { LoaderComponent } from './loader/loader.component';
import { ContextMenuComponent } from './context-menu/context-menu.component';
import { AvatarCloudinaryComponent } from './avatar-cloudinary/avatar-cloudinary.component';
import { LoaderWrapperComponent } from './loader-wrapper/loader-wrapper.component';



@NgModule({
  declarations: [
    HeaderComponent,
    JsonFileInputComponent,
    JsonFileExportComponent,
    ChartSelectorComponent,
    PopupComponent,
    LoaderComponent,
    ContextMenuComponent,
    AvatarCloudinaryComponent,
    LoaderWrapperComponent
  ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        HeaderComponent,
        PopupComponent,
        LoaderComponent,
        ContextMenuComponent,
        AvatarCloudinaryComponent,
        LoaderWrapperComponent
    ]
})
export class SharedModule { }
