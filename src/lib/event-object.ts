export interface EventObject {
  id?: string | number;
  title: string;
  allDay?: boolean;
  start: string | number;
  end?: string | number;
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
  color?: string;
  backgroundColor?: string;
  borderColor?: string;
  textColor?: string;
}
