import {
  AfterViewChecked,
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
  SimpleChanges,
} from '@angular/core';
import { Calendar, Draggable, formatDate } from 'fullcalendar';

import { EventObject } from './event.object';
import { FullCalendarOptions } from './fullcalendar-options';
import { ResourceObject } from './resource-object';

// declare const FullCalendar: any;

const defaultConfig: FullCalendarOptions = {
  aspectRatio: 1.35,
  defaultView: 'month',
  fixedWeekCount: true,
  showNonCurrentDates: true,
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
  timeZone: 'local',
  titleFormat: {
    year: 'numeric',
    month: 'long'
  },
  titleRangeSeparator: ' \u2013 ',
  defaultRangeSeparator: ' - ',
  dir: 'ltr',
  defaultTimedEventDuration: '01:00',
  defaultAllDayEventDuration: { days: 1 },
  eventOrder: 'start,-duration,allDay,title',
  rerenderDelay: null
};

@Component({
  selector: 'ngx-fullcalendar',
  template: ` `
})
export class FullCalendarComponent implements OnInit, OnDestroy, AfterViewChecked, DoCheck, OnChanges {

  @Input() draggableEl: any;
  @Input() containerEl: any;
  @Input() itemSelector: string;
  @Input() options: FullCalendarOptions;

  @Input() events: Array<EventObject>;
  @Input() resources: Array<ResourceObject>;
  @Input() header: any;
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
  @Input() timeZone: string;
  @Input() eventTimeFormat: string | Object;
  @Input() dayRender: Function;
  @Input() navLinks: boolean;
  // new in v4
  @Input() titleFormat: string | Object;
  @Input() titleRangeSeparator: string;
  @Input() defaultRangeSeparator: string;
  @Input() dir: string;
  @Input() defaultTimedEventDuration: string | Object;
  @Input() defaultAllDayEventDuration: string | Object;
  @Input() showNonCurrentDates: boolean;
  @Input() columnHeaderFormat: string | Object;
  @Input() slotLabelFormat: string | Object;
  @Input() columnHeaderText: Function;
  @Input() nextDayThreshold: string | Object;
  @Input() eventOrder: string | Array<string | Function> | Function;
  @Input() rerenderDelay: number | null;
  @Input() progressiveEventRendering: boolean;
  @Input() eventResizableFromStart: boolean;
  @Input() eventDragMinDistance: number;
  @Input() allDayMaintainDuration: boolean;
  @Input() listDayFormat: string | Object;
  @Input() listDayAltFormat: string | Object;

  // tslint:disable:no-output-on-prefix
  @Output() onDateClick: EventEmitter<any> = new EventEmitter();
  @Output() onDrop: EventEmitter<any> = new EventEmitter();
  @Output() onEventClick: EventEmitter<any> = new EventEmitter();
  @Output() onEventMouseEnter: EventEmitter<any> = new EventEmitter();
  @Output() onEventMouseLeave: EventEmitter<any> = new EventEmitter();
  @Output() onEventDragStart: EventEmitter<any> = new EventEmitter();
  @Output() onEventDragStop: EventEmitter<any> = new EventEmitter();
  @Output() onEventDrop: EventEmitter<any> = new EventEmitter();
  @Output() onEventReceive: EventEmitter<any> = new EventEmitter();
  @Output() onEventResizeStart: EventEmitter<any> = new EventEmitter();
  @Output() onEventResizeStop: EventEmitter<any> = new EventEmitter();
  @Output() onEventResize: EventEmitter<any> = new EventEmitter();
  @Output() onDatesRender: EventEmitter<any> = new EventEmitter();
  @Output() onDatesDestroy: EventEmitter<any> = new EventEmitter();
  @Output() onViewSkeletonRender: EventEmitter<any> = new EventEmitter();
  @Output() onViewSkeletonDestroy: EventEmitter<any> = new EventEmitter();
  @Output() onNavLinkDayClick: EventEmitter<any> = new EventEmitter();
  @Output() onNavLinkWeekClick: EventEmitter<any> = new EventEmitter();
  @Output() onEventRender: EventEmitter<any> = new EventEmitter();
  @Output() onEventDestroy: EventEmitter<any> = new EventEmitter();
  @Output() onEventPositioned: EventEmitter<any> = new EventEmitter();
  @Output() onDayRender: EventEmitter<any> = new EventEmitter();
  @Output() onSelect: EventEmitter<any> = new EventEmitter();
  @Output() onUnselect: EventEmitter<any> = new EventEmitter();
  @Output() onResourceRender: EventEmitter<any> = new EventEmitter();
  // tslint:enable:no-output-on-prefix

  calendar: any;
  initialized: boolean;
  eventDiffer: any;
  resourceDiffer: any;
  config: any;

  constructor(private el: ElementRef,
    differs: IterableDiffers) {
    this.eventDiffer = differs.find([]).create(null);
    this.resourceDiffer = differs.find([]).create(null);
    this.initialized = false;
  }

  ngOnInit() {
    this.config = this.safeGenerateConfig();
    this.config.resources = (fetchInfo, successCallback, failureCallback) => {
      successCallback(this.resources || []);
    };
    this.config.dateClick = (dateClickInfo) => {
      this.onDateClick.emit(dateClickInfo);
    };
    this.config.dayRender = (dayRenderInfo) => {
      this.onDayRender.emit(dayRenderInfo);
    };
    this.config.drop = (dropInfo) => {
      this.onDrop.emit(dropInfo);
    };
    this.config.eventClick = (eventClickInfo) => {
      this.onEventClick.emit(eventClickInfo);
    };
    this.config.eventMouseEnter = (mouseEnterInfo) => {
      this.onEventMouseEnter.emit(mouseEnterInfo);
    };
    this.config.eventMouseLeave = (mouseLeaveInfo) => {
      this.onEventMouseLeave.emit(mouseLeaveInfo);
    };
    this.config.eventDragStart = (info) => {
      this.onEventDragStart.emit(info);
    };
    this.config.eventDragStop = (info) => {
      this.onEventDragStop.emit(info);
    };
    this.config.eventDrop = (eventDropInfo) => {
      this._updateEvent(eventDropInfo.event);
      this.onEventDrop.emit(eventDropInfo);
    };
    this.config.eventReceive = (info) => {
      this.onEventReceive.emit(info);
    };
    this.config.eventResizeStart = (info) => {
      this.onEventResizeStart.emit(info);
    };
    this.config.eventResizeStop = (info) => {
      this.onEventResizeStop.emit(info);
    };
    this.config.eventResize = (eventResizeInfo) => {
      this._updateEvent(eventResizeInfo.event);
      this.onEventResize.emit(eventResizeInfo);
    };
    this.config.datesRender = (info) => {
      this.onDatesRender.emit({
        'info': info
      });
    };
    this.config.datesDestroy = (info) => {
      this.onDatesDestroy.emit({
        'info': info
      });
    };
    this.config.viewSkeletonRender = (info) => {
      this.onViewSkeletonRender.emit({
        'info': info
      });
    };
    this.config.viewSkeletonDestroy = (info) => {
      this.onViewSkeletonDestroy.emit({
        'info': info
      });
    };
    this.config.navLinkDayClick = (date, jsEvent) => {
      this.onNavLinkDayClick.emit({
        'date': date,
        'jsEvent': jsEvent
      });
    };
    this.config.navLinkWeekClick = (weekStart, jsEvent) => {
      this.onNavLinkWeekClick.emit({
        'weekStart': weekStart,
        'jsEvent': jsEvent
      });
    };
    this.config.eventRender = (info) => {
      this.onEventRender.emit(info);
    };
    this.config.eventDestroy = (info) => {
      this.onEventDestroy.emit(info);
    };
    this.config.eventPositioned = (info) => {
      this.onEventPositioned.emit(info);
    };
    this.config.select = (selectionInfo) => {
      this.onSelect.emit(selectionInfo);
    };
    this.config.unselect = (jsEvent, view) => {
      this.onUnselect.emit({
        'jsEvent': jsEvent,
        'view': view
      });
    };
    this.config.resourceRender = (renderInfo) => {
      this.onResourceRender.emit(renderInfo);
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
    this.calendar = new Calendar(this.el.nativeElement, this.config);
    this.calendar.render();

    if (!!this.draggableEl || !!this.containerEl) {
      if (!!this.draggableEl) {
        // tslint:disable-next-line:no-unused-expression
        new Draggable(this.draggableEl);
      } else if (this.containerEl) {
        // tslint:disable-next-line:no-unused-expression
        new Draggable(this.containerEl, {
          itemSelector: this.itemSelector
        });
      }
    }

    if (this.events) {
      this.calendar.addEventSource(this.events);
    }
    this.initialized = true;
  }

  private safeGenerateConfig() {
    const configFromAttrs = {
      // tslint:disable:no-non-null-assertion
      header: this.header!,
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
      timeZone: this.timeZone!,
      eventTimeFormat: this.eventTimeFormat!,
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
      // new in v4
      titleFormat: this.titleFormat!,
      titleRangeSeparator: this.titleRangeSeparator!,
      defaultRangeSeparator: this.defaultRangeSeparator!,
      dir: this.dir!,
      defaultTimedEventDuration: this.defaultTimedEventDuration!,
      defaultAllDayEventDuration: this.defaultAllDayEventDuration!,
      showNonCurrentDates: this.showNonCurrentDates!,
      columnHeaderFormat: this.columnHeaderFormat!,
      slotLabelFormat: this.slotLabelFormat!,
      columnHeaderText: this.columnHeaderText!,
      nextDayThreshold: this.nextDayThreshold!,
      eventOrder: this.eventOrder!,
      rerenderDelay: this.rerenderDelay!,
      progressiveEventRendering: this.progressiveEventRendering!,
      eventResizableFromStart: this.eventResizableFromStart!,
      eventDragMinDistance: this.eventDragMinDistance!,
      allDayMaintainDuration: this.allDayMaintainDuration!,
      listDayFormat: this.listDayFormat!,
      listDayAltFormat: this.listDayAltFormat!,
      // tslint:enable:no-non-null-assertion
    };

    return {
      ...defaultConfig,
      ...this.removeUndefinedProperties(this.options),
      ...this.removeUndefinedProperties(configFromAttrs)
    };
  }

  private _updateEvent(event: any) {
    console.log(event);
    const sourceEvent = this._findEvent(event.id);
    if (sourceEvent) {
      sourceEvent.start = formatDate(event.start);
      if (event.end) {
        sourceEvent.end = formatDate(event.end);
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
