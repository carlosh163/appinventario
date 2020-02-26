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
    KeyFilterModule

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
    KeyFilterModule
  ]
})
export class PrimengModule { }
