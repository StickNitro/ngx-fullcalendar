export interface EventObject {
  id?: string | number;
  title: string;
  allDay?: boolean;
  start?: string | Date;
  end?: string | Date;
  url?: string;
  className?: string | string[];
  editable?: boolean;
  startEditable?: boolean;
  durationEditable?: boolean;
  resourceEditable?: boolean;
  resourceId?: string;
  resourceIds?: string[];
  rendering?: '' | 'background' | 'inverse-background';
  overlap?: boolean;
  constraint?: any;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
  // new in v4
  groupId?: string;
  extendedProps?: { [key: string]: any };
  // simple event recurrence properties
  startTime?: Object; // needs API object defining
  endTime?: Object; // needs API object defining
  daysOfWeek?: Array<number>;
  startRecur?: string | Date;
  endRecur?: string | Date;
}
