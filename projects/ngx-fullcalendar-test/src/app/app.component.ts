import { Component, OnInit } from '@angular/core';
import { EventObject, FullCalendarOptions } from 'ngx-fullcalendar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  options: FullCalendarOptions;
  events: EventObject[];

  ngOnInit() {
    this.options = {
      defaultDate: '2018-07-26',
      editable: true,
      droppable: true
    };

    this.events = [
      { id: 'a', title: 'My Birthday', allDay: true, start: '2018-07-27' },
      { id: 'b', title: 'Friends coming round', start: '2018-07-26T18:00:00', end: '2018-07-26T23:00:00' },
      { id: 'c', title: 'Friends coming round', start: '2018-07-26T20:00:00' },
      {
        id: 'c', title: 'Friends coming round', startTime: '20:00:00', endTime: '22:00:00', daysOfWeek: [1, 3, 5],
        startRecur: '2018-07-01', endRecur: '2018-09-30'
      }
    ];
  }

  log(key, event) {
    console.log(key, event);
  }

}
