import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  DoCheck,
  ElementRef,
  EventEmitter,
  Input,
  IterableDiffers,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges
} from '@angular/core';

import { EventObject } from './event-object';
import { FullCalendarOptions } from './fullcalendar-options';
import { ResourceObject } from './resource-object';

declare const FullCalendar: any;

const defaultConfig: FullCalendarOptions = {
  aspectRatio: 1.35,
  defaultView: 'month',
  allDaySlot: true,
  allDayText: 'all-day',
  slotDuration: '00:30:00',
  scrollTime: '06:00:00',
  minTime: '00:00:00',
  maxTime: '24:00:00',
  slotEventOverlap: true,
  dragRevertDuration: 500,
  dragOpacity: .75,
  dragScroll: true,
  timezone: false,
  timeFormat: null
};

@Component({
  selector: 'ngx-fullcalendar',
  template: ``
})
export class FullCalendarComponent implements OnInit, OnDestroy, AfterViewChecked, DoCheck, OnChanges {

  @Input() droppableRef: any;
  @Input() options: FullCalendarOptions;

  @Input() events: EventObject[];
  @Input() resources: ResourceObject[];
  @Input() header: any;
  @Input() isRTL: boolean;
  @Input() weekends: boolean;
  @Input() hiddenDays: number[];
  @Input() fixedWeekCount: boolean;
  @Input() weekNumbers: boolean;
  @Input() businessHours: any;
  @Input() height: any;
  @Input() contentHeight: any;
  @Input() aspectRatio: number;
  @Input() eventLimit: any;
  @Input() defaultDate: any;
  @Input() editable: boolean;
  @Input() droppable: boolean;
  @Input() eventStartEditable: boolean;
  @Input() eventDurationEditable: boolean;
  @Input() defaultView: string;
  @Input() allDaySlot: boolean;
  @Input() allDayText: string;
  @Input() slotDuration: any;
  @Input() slotLabelInterval: any;
  @Input() snapDuration: any;
  @Input() scrollTime: any;
  @Input() minTime: any;
  @Input() maxTime: any;
  @Input() slotEventOverlap: boolean;
  @Input() nowIndicator: boolean;
  @Input() dragRevertDuration: number;
  @Input() dragOpacity: number;
  @Input() dragScroll: boolean;
  @Input() eventOverlap: any;
  @Input() eventConstraint: any;
  @Input() locale: string;
  @Input() timezone: boolean | string;
  @Input() timeFormat: string | null;
  @Input() dayRender: Function;
  @Input() navLinks: boolean;

  // tslint:disable:no-output-on-prefix
  @Output() onDayClick: EventEmitter<any> = new EventEmitter();
  @Output() onDrop: EventEmitter<any> = new EventEmitter();
  @Output() onEventClick: EventEmitter<any> = new EventEmitter();
  @Output() onEventMouseover: EventEmitter<any> = new EventEmitter();
  @Output() onEventMouseout: EventEmitter<any> = new EventEmitter();
  @Output() onEventDragStart: EventEmitter<any> = new EventEmitter();
  @Output() onEventDragStop: EventEmitter<any> = new EventEmitter();
  @Output() onEventDrop: EventEmitter<any> = new EventEmitter();
  @Output() onEventReceive: EventEmitter<any> = new EventEmitter();
  @Output() onEventResizeStart: EventEmitter<any> = new EventEmitter();
  @Output() onEventResizeStop: EventEmitter<any> = new EventEmitter();
  @Output() onEventResize: EventEmitter<any> = new EventEmitter();
  @Output() onViewRender: EventEmitter<any> = new EventEmitter();
  @Output() onViewDestroy: EventEmitter<any> = new EventEmitter();
  @Output() onNavLinkDayClick: EventEmitter<any> = new EventEmitter();
  @Output() onNavLinkWeekClick: EventEmitter<any> = new EventEmitter();
  @Output() onEventRender: EventEmitter<any> = new EventEmitter();
  @Output() onEventDestroy: EventEmitter<any> = new EventEmitter();
  @Output() onEventAfterRender: EventEmitter<any> = new EventEmitter();
  // tslint:enable:no-output-on-prefix

  calendar: any;
  initialized: boolean;
  eventDiffer: any;
  resourceDiffer: any;
  config: any;

  constructor(private el: ElementRef,
    private cdRef: ChangeDetectorRef,
    differs: IterableDiffers) {
    this.eventDiffer = differs.find([]).create(null);
    this.resourceDiffer = differs.find([]).create(null);
    this.initialized = false;
  }

  ngOnInit() {
    this.config = this.safeGenerateConfig();
    this.config.resources = (callback) => {
      callback(this.resources || []);
    };
    this.config.dayClick = (date, jsEvent, view) => {
      this.onDayClick.emit({
        'date': date,
        'jsEvent': jsEvent,
        'view': view
      });
    };
    this.config.drop = (date, jsEvent, ui, resourceId) => {
      this.onDrop.emit({
        'date': date,
        'jsEvent': jsEvent,
        'resourceId': resourceId
      });
    };
    this.config.eventClick = (calEvent, jsEvent, view) => {
      this.onEventClick.emit({
        'calEvent': calEvent,
        'jsEvent': jsEvent,
        'view': view
      });
    };
    this.config.eventMouseover = (calEvent, jsEvent, view) => {
      this.onEventMouseover.emit({
        'calEvent': calEvent,
        'jsEvent': jsEvent,
        'view': view
      });
    };
    this.config.eventMouseout = (calEvent, jsEvent, view) => {
      this.onEventMouseout.emit({
        'calEvent': calEvent,
        'jsEvent': jsEvent,
        'view': view
      });
    };
    this.config.eventDragStart = (event, jsEvent, ui, view) => {
      this.onEventDragStart.emit({
        'event': event,
        'jsEvent': jsEvent,
        'view': view
      });
    };
    this.config.eventDragStop = (event, jsEvent, ui, view) => {
      this.onEventDragStop.emit({
        'event': event,
        'jsEvent': jsEvent,
        'view': view
      });
    };
    this.config.eventDrop = (event, delta, revertFunc, jsEvent, ui, view) => {
      this._updateEvent(event);

      this.onEventDrop.emit({
        'event': event,
        'delta': delta,
        'revertFunc': revertFunc,
        'jsEvent': jsEvent,
        'view': view
      });
    };
    this.config.eventReceive = (event) => {
      this.onEventReceive.emit({
        'event': event
      });
    };
    this.config.eventResizeStart = (event, jsEvent, ui, view) => {
      this.onEventResizeStart.emit({
        'event': event,
        'jsEvent': jsEvent,
        'view': view
      });
    };
    this.config.eventResizeStop = (event, jsEvent, ui, view) => {
      this.onEventResizeStop.emit({
        'event': event,
        'jsEvent': jsEvent,
        'view': view
      });
    };
    this.config.eventResize = (event, delta, revertFunc, jsEvent, ui, view) => {
      this._updateEvent(event);

      this.onEventResize.emit({
        'event': event,
        'delta': delta,
        'revertFunc': revertFunc,
        'jsEvent': jsEvent,
        'view': view
      });
    };
    this.config.viewRender = (view, element) => {
      this.onViewRender.emit({
        'view': view,
        'element': element
      });
    };
    this.config.viewDestroy = (view, element) => {
      this.onViewDestroy.emit({
        'view': view,
        'element': element
      });
    };
    this.config.navLinkDayClick = (weekStart, jsEvent) => {
      this.onNavLinkDayClick.emit({
        'weekStart': weekStart,
        'jsEvent': jsEvent
      });
    };
    this.config.navLinkWeekClick = (weekStart, jsEvent) => {
      this.onNavLinkWeekClick.emit({
        'weekStart': weekStart,
        'jsEvent': jsEvent
      });
    };
    this.config.eventRender = (event, element, view) => {
      this.onEventRender.emit({
        'event': event,
        'element': element,
        'view': view
      });
    };
    this.config.eventDestroy = (event, element, view) => {
      this.onEventDestroy.emit({
        'event': event,
        'element': element,
        'view': view
      });
    };
    this.config.eventAfterRender = (event, element, view) => {
      this.onEventAfterRender.emit({
        'event': event,
        'element': element,
        'view': view
      });
    };
  }

  ngOnDestroy() {
    if (this.calendar) {
      this.calendar.destroy();
      this.initialized = false;
      this.calendar = null;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.calendar) {
      for (const propName in changes) {
        if (propName !== 'events') {
          this.calendar.option(propName, changes[propName].currentValue);
        }
      }
    }
  }

  ngAfterViewChecked() {
    if (!this.initialized && this.el.nativeElement.offsetParent) {
      this.initialize();
    }
  }

  ngDoCheck() {
    const eventChanges = this.eventDiffer.diff(this.events);
    if (this.calendar && eventChanges) {
      this.calendar.removeEventSources();
      if (this.events) {
        this.calendar.addEventSource(this.events);
      }
    }

    const resourceChanges = this.resourceDiffer.diff(this.resources);
    if (this.calendar && resourceChanges) {
      this.calendar.refetchResources();
    }
  }

  private initialize() {
    FullCalendar.dragula({
      containers: [this.droppableRef],
      copy: true
    });
    this.calendar = new FullCalendar.Calendar(this.el.nativeElement, this.config);
    this.calendar.render();
    if (this.events) {
      this.calendar.addEventSource(this.events);
    }
    this.initialized = true;
  }

  private safeGenerateConfig() {
    const configFromAttrs = {
      // tslint:disable:no-non-null-assertion
      header: this.header!,
      isRTL: this.isRTL!,
      weekends: this.weekends!,
      hiddenDays: this.hiddenDays!,
      fixedWeekCount: this.fixedWeekCount!,
      weekNumbers: this.weekNumbers!,
      businessHours: this.businessHours!,
      height: this.height!,
      contentHeight: this.contentHeight!,
      aspectRatio: this.aspectRatio!,
      eventLimit: this.eventLimit!,
      defaultDate: this.defaultDate!,
      locale: this.locale!,
      timezone: this.timezone!,
      timeFormat: this.timeFormat!,
      editable: this.editable!,
      droppable: this.droppable!,
      eventStartEditable: this.eventStartEditable!,
      eventDurationEditable: this.eventDurationEditable!,
      defaultView: this.defaultView!,
      allDaySlot: this.allDaySlot!,
      allDayText: this.allDayText!,
      slotDuration: this.slotDuration!,
      slotLabelInterval: this.slotLabelInterval!,
      snapDuration: this.snapDuration!,
      scrollTime: this.scrollTime!,
      minTime: this.minTime!,
      maxTime: this.maxTime!,
      slotEventOverlap: this.slotEventOverlap!,
      nowIndicator: this.nowIndicator!,
      dragRevertDuration: this.dragRevertDuration!,
      dragOpacity: this.dragOpacity!,
      dragScroll: this.dragScroll!,
      eventOverlap: this.eventOverlap!,
      eventConstraint: this.eventConstraint!,
      dayRender: this.dayRender!,
      navLinks: this.navLinks!,
      // tslint:enable:no-non-null-assertion
    };

    return {
      ...defaultConfig,
      ...this.removeUndefinedProperties(this.options),
      ...this.removeUndefinedProperties(configFromAttrs)
    };
  }

  private _updateEvent(event: any) {
    const sourceEvent = this._findEvent(event.id);
    if (sourceEvent) {
      sourceEvent.start = event.start.format();
      if (event.end) {
        sourceEvent.end = event.end.format();
      }
      if (event.resourceId) {
        sourceEvent.resourceId = event.resourceId;
      }
    }
  }

  private _findEvent(id: string) {
    let event;
    if (this.events) {
      for (const e of this.events) {
        if (e.id === id) {
          event = e;
          break;
        }
      }
    }
    return event;
  }

  removeUndefinedProperties<T>(object: Object): T {
    return JSON.parse(JSON.stringify(typeof object === 'object' ? object : {}));
  }

}
