import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {CalendarModule} from 'primeng/calendar';
import {ToastModule} from 'primeng/toast';
import {ToolbarModule} from 'primeng/toolbar';

import {MenuModule} from 'primeng/menu';
import {MenuItem} from 'primeng/api';
import {SidebarModule} from 'primeng/sidebar';
import {KeyFilterModule} from 'primeng/keyfilter';
import {DialogModule} from 'primeng/dialog';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {PanelModule} from 'primeng/panel';
import {InputTextareaModule} from 'primeng/inputtextarea';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputMaskModule,
    CalendarModule,
    ToastModule,
    ToolbarModule,
    MenuModule,
    //MenuItem
    SidebarModule,
    KeyFilterModule,
    DialogModule,
    DynamicDialogModule,
    AutoCompleteModule,
    PanelModule,
    InputTextareaModule

  ],
  exports:[
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputMaskModule,
    CalendarModule,
    ToastModule,
    ToolbarModule,
    MenuModule,
    SidebarModule,
    KeyFilterModule,
    DialogModule,
    DynamicDialogModule,
    AutoCompleteModule,
    PanelModule,
    InputTextareaModule
  ]
})
export class PrimengModule { }
