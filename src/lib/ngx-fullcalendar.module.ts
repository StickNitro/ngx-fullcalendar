import { CommonModule } from '@angular/common';
import { FullCalendarComponent } from './fullcalendar.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FullCalendarComponent
  ],
  exports: [
    FullCalendarComponent
  ]
})
export class NgxFullCalendarModule { }
