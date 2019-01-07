# ngx-fullcalendar

[![GitHub issues](https://img.shields.io/github/issues/StickNitro/ngx-fullcalendar.svg)](https://github.com/StickNitro/ngx-fullcalendar/issues)
[![GitHub forks](https://img.shields.io/github/forks/StickNitro/ngx-fullcalendar.svg)](https://github.com/StickNitro/ngx-fullcalendar/network)
[![GitHub stars](https://img.shields.io/github/stars/StickNitro/ngx-fullcalendar.svg)](https://github.com/StickNitro/ngx-fullcalendar/stargazers)
[![GitHub license](https://img.shields.io/github/license/StickNitro/ngx-fullcalendar.svg)](https://github.com/StickNitro/ngx-fullcalendar/blob/master/LICENSE)

[![latest](https://img.shields.io/npm/v/ngx-fullcalendar/latest.svg)](http://www.npmjs.com/package/ngx-fullcalendar) 
[![npm](https://img.shields.io/npm/dt/ngx-fullcalendar.svg)](https://www.npmjs.com/package/ngx-fullcalendar)

This package wraps the [fullcalendar](https://fullcalendar.io) module for Angular v6 and above.

## Access to the latest changes for fullcalendar v4 alpha 3 (fullcalendar and scheduler) can be found in the [`upgrade-v4-alpha`](https://github.com/StickNitro/ngx-fullcalendar/tree/upgrade-v4-alpha) branch and can be installed from [NPM](https://www.npmjs.com/package/ngx-fullcalendar/v/5.0.0-alpha.0)

# Installation

Install via [NPM](https://npmjs.com)

First install the peer dependencies, this is currently based around the fullcalendar v4 package which is in alpha, so install this version

```
npm install fullcalendar@4.0.0-alpha
npm install fullcalendar-scheduler@4.0.0-alpha.2
```

We also need to include [moment](https://momentjs.com) and [dragula](https://bevacqua.github.io/dragula/)

```
foo@bar:~$ npm install moment dragula
```

Modify your `angular.json` to import the relevant scripts and styles, it should look like this:

```json
"styles": [
  ...
  "node_modules/dragula/dist/dragula.min.css",
  "node_modules/fullcalendar/dist/fullcalendar.min.css",
  "node_modules/fullcalendar-scheduler/dist/scheduler.min.css",
  ...
],
"scripts": [
  ...
  "./node_modules/moment/moment.js",
  "./node_modules/dragula/dist/dragula.min.js",
  "./node_modules/fullcalendar/dist/fullcalendar.min.js",
  "./node_modules/fullcalendar/dist/dragula.min.js",
  "./node_modules/fullcalendar-scheduler/dist/scheduler.min.js"
]
```

Finally, install ngx-fullcalendar

```
foo@bar:~$ npm install ngx-fullcalendar
```


# Getting Started

Import the `NgxFullCalendarModule` (see test application).

```typescript
import { NgxFullCalendarModule } from 'ngx-fullcalendar';

@NgModule({
  imports: [
    BrowserModule,
    NgxFullCalendarModule,
    ...
  ],
  ...
})
export class AppModule { }
```

Use `ngx-fullcalendar` in your `app-component.html` template.

```html
<ngx-fullcalendar defaultView="month" [events]="events" [options]="options"></ngx-fullcalendar>
```

And in your `app-component.ts` component class:

```typescript
import { FullCalendarOptions, EventObject } from 'ngx-fullcalendar';

@Component({
  selector: 'app-root',
  templateUrl: './app-component.html'
})
export class AppComponent implements OnInit {
  options: FullCalendarOptions;
  events: EventObject[];

  ngOnInit() {
    this.options = {
      defaultDate: '2018-07-26',
      editable: true,
      ...
    };

    this.events = [
      { id: 'a', title: 'My Birthday', allDay: true },
      { id: 'b', title: 'Friends coming round', start: '2018-07-26T18:00:00', end: '2018-07-26T23:00:00' }
    ]
  }
}
```

# Inputs and Outputs

You can initialize the `ngx-fullcalendar` with the `FullCalendarOptions` object or by specify the various options directly on the component, all properties in the `FullCalendarOptions` can be set directly on the component itself.

```typescript
export interface FullCalendarOptions {
  header?: any;
  isRTL?: boolean;
  weekends?: boolean;
  hiddenDays?: number[];
  fixedWeekCount?: boolean;
  weekNumbers?: boolean;
  businessHours?: any;
  height?: any;
  contentHeight?: any;
  aspectRatio?: number;
  eventLimit?: any;
  defaultDate?: any;
  locale?: string;
  timezone?: boolean | string;
  timeFormat?: string | null;
  editable?: boolean;
  droppable?: boolean;
  eventStartEditable?: boolean;
  eventDurationEditable?: boolean;
  defaultView?: string;
  allDaySlot?: boolean;
  allDayText?: string;
  slotDuration?: any;
  slotLabelInterval?: any;
  snapDuration?: any;
  scrollTime?: any;
  minTime?: any;
  maxTime?: any;
  slotEventOverlap?: boolean;
  nowIndicator?: boolean;
  dragRevertDuration?: number;
  dragOpacity?: number;
  dragScroll?: boolean;
  eventOverlap?: any;
  eventConstraint?: any;
  dayRender?: Function;
  navLinks?: boolean;
}
```

There are also the following events that can be bound:

* **onDayClick**: Is emitted when the user clicks on a day in the `fullcalendar`.

  - 'date': the moment like date that was clicked
  - 'jsEvent': the native javascript event object
  - 'view': A reference to the current view
  - 'resourceId': (optional) will be populated if dropped on a Scheduler resource

* **onDrop**: Is emitted when a valid external UI draggable has been dropped onto the calendar.

  - 'date': the moment like date that was clicked
  - 'jsEvent': the native javascript event object
  - 'resourceId': will be populated if dropped on a Scheduler resource

* **onEventClick**: Is emitted when an event is clicked.

  - 'calEvent': the calender event object
  - 'jsEvent': the native javascript event object
  - 'view': A reference to the current view

* **onEventMouseover**: Is emitted when the mouse is moved over an event.

  - 'calEvent': the calender event object
  - 'jsEvent': the native javascript event object
  - 'view': A reference to the current view

* **onEventMouseout**: Is emitted when the mouse is moved away and is no longer over an event.

  - 'calEvent': the calender event object
  - 'jsEvent': the native javascript event object
  - 'view': A reference to the current view

* **onEventDragStart**: Is emitted when event dragging begins.

  - 'event': the calender event object
  - 'jsEvent': the native javascript event object
  - 'view': A reference to the current view

* **onEventDragStop**: Is emitted when event dragging stops.

  - 'event': the calender event object
  - 'jsEvent': the native javascript event object
  - 'view': A reference to the current view

* **onEventDrop**: Is emitted when dragging stops and the event has moved to a *different day/time*.

  - 'event': the calender event object
  - 'delta': is a Duration object that represents the amount of time the event was moved by
  - 'revertFunc': is a function that, if called, reverts the event’s start/end date to the values before the drag
  - 'jsEvent': the native javascript event object
  - 'view': A reference to the current view

* **onEventReceive**: Is emitted when a valid external UI draggable, containing event data, has been dropped onto the calendar.

  - 'event': the calender event object

* **onEventResizeStart**: Is emitted when event resizing begins.

  - 'event': the calender event object
  - 'jsEvent': the native javascript event object
  - 'view': A reference to the current view

* **onEventResizeStop**: Is emitted when event resizing stops.

  - 'event': the calender event object
  - 'jsEvent': the native javascript event object
  - 'view': A reference to the current view

* **onEventResize**: Is emitted when resizing stops and the event has changed in duration.

  - 'event': the calender event object
  - 'delta': is a Duration object that represents the amount of time the event was moved by
  - 'revertFunc': is a function that, if called, reverts the event’s start/end date to the values before the drag
  - 'jsEvent': the native javascript event object
  - 'view': A reference to the current view

* **onViewRender**: Is emitted when a new date-range is rendered, or when the view type switches.

  - 'view': A reference to the current view
  - 'element': Is an element for the container of the new view

* **onViewDestroy**: Is emitted when a rendered date-range needs to be torn down

  - 'view': A reference to the current view
  - 'element': Is an element for the container of the new view

* **onNavLinkDayClick**: Is emitted upon a day heading nav-link being clicked.

  - 'weekStart': the view name (string), function
  - 'jsEvent': the native javascript event object

* **onNavLinkWeekClick**: Is emitted upon a week-number nav-link being clicked.

  - 'weekStart': the view name (string), function
  - 'jsEvent': the native javascript event object

* **onEventRender**: Is emitted while an event is being rendered. A hook for modifying its DOM.

  - 'event': the calender event object
  - 'element': Is an element for the container of the new view
  - 'view': A reference to the current view

* **onEventDestroy**: Is emitted before an event’s element is removed from the DOM.

  - 'event': the calender event object
  - 'element': Is an element for the container of the new view
  - 'view': A reference to the current view

* **onEventAfterRender**: Is emitted after an event has been placed on the calendar in its final position.

  - 'event': the calender event object
  - 'element': Is an element for the container of the new view
  - 'view': A reference to the current view

# API

View the [Official fullcalendar docs](https://fullcalendar.io/docs#toc) for full details of the API.

# TODO

* Support all remaining events
* Fully support Scheduler properties
* Enhance access to API
* 

# License

MIT
