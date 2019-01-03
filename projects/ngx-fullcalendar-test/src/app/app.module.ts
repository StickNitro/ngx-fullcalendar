import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxFullcalendarModule } from 'ngx-fullcalendar';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,

    NgxFullcalendarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
