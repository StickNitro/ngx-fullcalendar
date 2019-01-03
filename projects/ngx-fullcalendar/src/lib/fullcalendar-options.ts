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
  // new in v4
  titleFormat?: string | Object;
  titleRangeSeparator?: string;
  defaultRangeSeparator?: string;
  defaultTimedEventDuration?: string | Object; // Duration
  defaultAllDayEventDuration?: string | Object; // Duration
  columnHeaderFormat?: string | Object; // Date Formatting
  slotLabelFormat?: string | Object; // Date Formatting
  columnHeaderText?: Function;
  nextDayThreshold?: string | Object; // Duration
  eventOrder?: string | Array<string | Function> | Function;
  rerenderDelay?: number | null;
  progressiveEventRendering?: boolean;
  eventResizableFromStart?: boolean;
  eventDragMinDistance?: number;
  allDayMaintainDuration?: boolean;
  listDayFormat?: string | Object;
  listDayAltFormat?: string | Object;
}
