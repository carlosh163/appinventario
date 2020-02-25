import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {DropdownModule} from 'primeng/dropdown';
import {InputMaskModule} from 'primeng/inputmask';
import {CalendarModule} from 'primeng/calendar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputMaskModule,
    CalendarModule
  ],
  exports:[
    TableModule,
    ButtonModule,
    InputTextModule,
    DropdownModule,
    InputMaskModule,
    CalendarModule
  ]
})
export class PrimengModule { }
