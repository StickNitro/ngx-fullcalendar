# ngx-fullcalendar

[![GitHub issues](https://img.shields.io/github/issues/StickNitro/ngx-fullcalendar.svg)](https://github.com/StickNitro/ngx-fullcalendar/issues)
[![GitHub forks](https://img.shields.io/github/forks/StickNitro/ngx-fullcalendar.svg)](https://github.com/StickNitro/ngx-fullcalendar/network)
[![GitHub stars](https://img.shields.io/github/stars/StickNitro/ngx-fullcalendar.svg)](https://github.com/StickNitro/ngx-fullcalendar/stargazers)
[![GitHub license](https://img.shields.io/github/license/StickNitro/ngx-fullcalendar.svg)](https://github.com/StickNitro/ngx-fullcalendar/blob/master/LICENSE)

[![latest](https://img.shields.io/npm/v/ngx-fullcalendar/latest.svg)](http://www.npmjs.com/package/ngx-fullcalendar) 
[![npm](https://img.shields.io/npm/dt/ngx-fullcalendar.svg)](https://www.npmjs.com/package/ngx-fullcalendar)

This package wraps the [fullcalendar](https://fullcalendar.io) module for Angular v6 and above.

## **WARNING**: This release contains breaking changes from fullcalendar v4 Alpha 3 and fullcalendar-scheduler v4 Alpha 3. [Read the full Upgrade Guide »](https://fullcalendar.io/docs/v4/release-notes)

# Installation

Install via [NPM](https://npmjs.com)

First install the peer dependencies, this is currently based around the fullcalendar v4 package which is in alpha, so install this version

```
npm install fullcalendar@alpha
npm install fullcalendar-scheduler@alpha
```

Modify your `angular.json` to import the relevant scripts and styles, it should look like this:

```json
"styles": [
  ...
  "node_modules/fullcalendar/dist/fullcalendar.min.css",
  "node_modules/fullcalendar-scheduler/dist/scheduler.min.css",
  ...
],
"scripts": [
  ...
  "./node_modules/fullcalendar/dist/fullcalendar.min.js",
  "./node_modules/fullcalendar-scheduler/dist/scheduler.min.js"
]
```

And finally, install ngx-fullcalendar

```
foo@bar:~$ npm install ngx-fullcalendar@alpha
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
  dir?: string;
  weekends?: boolean;
  hiddenDays?: number[];
  fixedWeekCount?: boolean;
  showNonCurrentDates?: boolean;
  weekNumbers?: boolean;
  businessHours?: any;
  height?: any;
  contentHeight?: any;
  aspectRatio?: number;
  eventLimit?: any;
  defaultDate?: any;
  locale?: string;
  timeZone?: string;
  evenTimeFormat?: string | Object;
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
  titleFormat?: string | Object;
  titleRangeSeparator?: string;
  defaultRangeSeparator?: string;
  defaultTimedEventDuration?: string | Object;
  defaultAllDayEventDuration?: string | Object;
  columnHeaderFormat?: string | Object;
  slotLabelFormat?: string | Object;
  columnHeaderText?: Function;
  nextDayThreshold?: string | Object;
  eventOrder?: string | Array<string | Function> | Function;
  rerenderDelay?: number | null;
  progressiveEventRendering?: boolean;
  eventResizableFromStart?: boolean;
  eventDragMinDistance?: number;
  allDayMaintainDuration?: boolean;
  listDayFormat?: string | Object;
  listDayAltFormat?: string | Object;
}
```

There are also the following events that can be bound:

* **onDateClick**: Is emitted when the user clicks on a day in the `fullcalendar`.

  ```typescript
  function (dateClickInfo) { }
  ```

  `dateClickInfo` is a plain object with the following properties:
  
  | prop | description |
  | --- | --- |
  | date | a Date for the clicked day/time. |
  | dateStr | An ISO8601 string representation of the date. Will have a time zone offset according to the calendar’s timeZone like `2018-09-01T12:30:00-05:00`. If clicked on an all-day cell, won’t have a time part nor a time zone part, like `2018-09-01`. |
  | allDay | `true` or `false` whether the click happened on an all-day cell. |
  | dayEl | An HTML element that represents the whole-day that was clicked on. |
  | jsEvent | The native JavaScript event with low-level information such as click coordinates. |
  | view | The current View Object. |
  | resource | If the current view is a resource-view, the Resource Object that owns this date. Must be using the Scheduler plugin. |

* **onDrop**: Is emitted when a valid external UI draggable has been dropped onto the calendar.

  ```typescript
  function (dropInfo) { }
  ```

  ```dropInfo``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | draggedEl | The HTML element that was being dragged. |
  | date | The Date of where the draggable was dropped. |
  | resource | If the current view is a resource-view, the Resource Object the element was dropped on. Must be using the Scheduler plugin. |
  | allDay | `true` or `false` whether dropped on one of the all-day cells. |
  | jsEvent | The native JavaScript event with low-level information such as click coordinates. |
  | view | The current View Object. |

* **onEventClick**: Is emitted when an event is clicked.

  ```typescript
  function (eventClickInfo) { }
  ```

  ```eventClickInfo``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | event |	The associated Event Object. |
  | el | The HTML element for this event. |
  | jsEvent | The native JavaScript event with low-level information such as click coordinates. |
  | view | The current View Object. |

* **onEventMouseEnter**: Is emitted when the mouse is moved over an event.

  ```typescript
  function (mouseEnterInfo) { }
  ```

  ```mouseEnterInfo``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | event | The associated Event Object. |
  | el | The HTML element for this event. |
  | jsEvent | The native JavaScript event with low-level information such as click coordinates. |
  | view | The current View Object. |

* **onEventMouseLeave**: Is emitted when the mouse is moved away and is no longer over an event.

  ```typescript
  function (mouseLeaveInfo) { }
  ```

  ```mouseLeaveInfo``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | event | The associated Event Object. |
  | el | The HTML element for this event. |
  | jsEvent | The native JavaScript event with low-level information such as click coordinates. |
  | view | The current View Object. |

* **onEventDragStart**: Is emitted when event dragging begins.

  ```typescript
  function (info) { }
  ```

  ```info``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | event | An Event Object that holds information about the event (date, title, etc) **after** the drop. |
  | jsEvent | The native JavaScript event with low-level information such as click coordinates. |
  | view | The current View Object. |

* **onEventDragStop**: Is emitted when event dragging stops.

  ```typescript
  function (info) { }
  ```

  ```info``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | event | An Event Object that holds information about the event (date, title, etc) **after** the drop. |
  | jsEvent | The native JavaScript event with low-level information such as click coordinates. |
  | view | The current View Object. |

* **onEventDrop**: Is emitted when dragging stops and the event has moved to a *different day/time*.

  ```typescript
  function (eventDropInfo) { }
  ```

  ```eventDropInfo``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | event | An Event Object that holds information about the event (date, title, etc) **after** the drop. |
  | prevEvent | An Event Object that holds information about the event before the drop. |
  | delta | A Duration Object that represents the amount of time the event was moved by. |
  | revert | A function that, if called, reverts the event’s start/end date to the values before the drag. This is useful if an ajax call should fail. |
  | jsEvent | The native JavaScript event with low-level information such as click coordinates. |
  | view | The current View Object. |

* **onEventReceive**: Is emitted when a valid external UI draggable, containing event data, has been dropped onto the calendar.

  ```typescript
  function (info) { }
  ```

  ```info``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | draggedEl | The HTML element that was being dragged. |
  | event | An Event object containing the newly created/received event. |
  | view | The current View Object. |

* **onEventResizeStart**: Is emitted when event resizing begins.

  ```typescript
  function (info) { }
  ```

  ```info``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | event | An Event Object that holds information about the event (date, title, etc) **after** the drop. |
  | jsEvent | The native JavaScript event with low-level information such as click coordinates. |
  | view | The current View Object. |

* **onEventResizeStop**: Is emitted when event resizing stops.

  ```typescript
  function (info) { }
  ```

  ```info``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | event | An Event Object that holds information about the event (date, title, etc) **after** the drop. |
  | jsEvent | The native JavaScript event with low-level information such as click coordinates. |
  | view | The current View Object. |

* **onEventResize**: Is emitted when resizing stops and the event has changed in duration.

  ```typescript
  function (eventResizeInfo) { }
  ```

  ```eventResizeInfo``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | event | An Event Object that holds information about the event (date, title, etc) after the resize. |
  | prevEvent | An Event Object that holds information about the event before the resize. |
  | startDelta | A Duration Object that represents the amount of time the event’s start date was moved by. |
  | endDelta | A Duration Object that represents the amount of time the event’s end date was moved by. |
  | revert | A function that, if called, reverts the event’s start/end date to the values before the drag. This is useful if an ajax call should fail. |
  | view | The current View Object. |

* **onDatesRender**: Is emitted when a new date-range is rendered, or when the view type switches.

  ```typescript
  function (info) { }
  ```

  ```info``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | view | The current View Object. |
  | el | The HTML element for the container of the current view. |

* **onDatesDestroy**: Is emitted when a rendered date-range needs to be torn down

  ```typescript
  function (info) { }
  ```

  ```info``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | view | The current View Object. |
  | el | The HTML element for the container of the current view. |

* **onViewSkeletonRender**: Is emitted after a view’s non-date-related DOM structure has been rendered.

  ```typescript
  function (info) { }
  ```

  ```info``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | view | The current View Object. |
  | el | The HTML element for the container of the current view. |

* **onViewSkeletonDestroy**: Is emitted before a view’s DOM skeleton is removed from the DOM.

  ```typescript
  function (info) { }
  ```

  ```info``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | view | The current View Object. |
  | el | The HTML element for the container of the current view. |

* **onNavLinkDayClick**: Is emitted upon a day heading nav-link being clicked.

  - 'date': the view name (string), function
  - 'jsEvent': the native javascript event object

* **onNavLinkWeekClick**: Is emitted upon a week-number nav-link being clicked.

  - 'weekStart': the view name (string), function
  - 'jsEvent': the native javascript event object

* **onEventRender**: Is emitted while an event is being rendered. A hook for modifying its DOM.

  ```typescript
  function (info) { }
  ```

  ```info``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | event | The associated Event Object. |
  | el | The HTML element that is being rendered. It has already been populated with the correct time/title text. |
  | isMirror | true if the element being rendered is a “mirror” from a user drag, resize, or selection (see selectMirror). false otherwise. |
  | isStart | true if the element being rendered is the starting slice of the event’s range. false otherwise. |
  | isEnd | true if the element being rendered is the ending slice of the event’s range. false otherwise. |
  | view | The current View Object. |

* **onEventDestroy**: Is emitted before an event’s element is removed from the DOM.

  ```typescript
  function (info) { }
  ```

  ```info``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | event | The associated Event Object. |
  | el | The HTML element that is being rendered. It has already been populated with the correct time/title text. |
  | view | The current View Object. |

* **onEventPositioned**" Is emitted after an event has been placed on the calendar in its final position.

  ```typescript
  function (info) { }
  ```

  ```info``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | event | The associated Event Object. |
  | el | The HTML element that is being rendered. |
  | isMirror | ```true``` if the element being rendered is a “mirror” from a user drag, resize, or selection (see selectMirror). ```false``` otherwise. |
  | isStart | ```true``` if the element being rendered is the starting slice of the event’s range. ```false``` otherwise. |
  | isEnd | ```true``` if the element being rendered is the ending slice of the event’s range. ```false``` otherwise. |
  | view | The current View Object. |

* **onDayRender**: A hook for modifying a day cell’s DOM.

  ```typescript
  function (info) { }
  ```

  ```info``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  |date | The Date for the given day. |
  |el | The HTML element for the given day. |
  |view | The current View Object. |

* **onSelect**: Is emitted when a date/time selection is made.

  ```typescript
  function (selectionInfo) { }
  ```

  ```selectionInfo``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | start | a Date indicating the beginning of the selection. |
  | end | a Date indicating the end of the selection.<br><br>**It is an exclusive value**, so if the selection is all-day, and the last day is a Thursday, ```end``` will be Friday. |
  | startStr | An ISO8601 string representation of the start date. Will have a time zone offset according to the calendar’s timeZone like ```2018-09-01T12:30:00-05:00```. If selecting all-day cells, won’t have a time part nor a time zone part, like ```2018-09-01```. |
  | endStr | Just like ```startStr```, but for the ```end``` date. |
  | allDay | ```true``` or ```false``` whether the selection happened on all-day cells. |
  | jsEvent | The native JavaScript event with low-level information such as click coordinates. |
  | view | The current View Object. |
  | resource | If the current view is a resource-view, the Resource Object that was selected. Must be using the Scheduler plugin. |

* **onUnselect**: A hook for modifying a day cell’s DOM.

  ```typescript
  function (jsEvent, view) { }
  ```

  - 'jsEvent': the native javascript event object
  - 'view': The current View Object.

* **onResourceRender**: A hook for modifying a day cell’s DOM.

  ```typescript
  function (renderInfo) { }
  ```

  ```renderInfo``` is a plain object with the following properties:

  | prop | description |
  | --- | --- |
  | resource | The Resource Object being rendered. |
  | el | The DOM element that represents this resource. Most likely a that wraps the resource’s title. |
  | view | The current View. |

# API

View the [Official fullcalendar docs](https://fullcalendar.io/docs#toc) for full details of the API.

# TODO

* Support of any events currently not exposed
* Additional properties and options not yet exposed
* Enhance access to API
* Expose types for event objects as well as Date formatter and Duration
* 

# License

MIT
