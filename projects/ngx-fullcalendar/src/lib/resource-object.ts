export interface ResourceObject {
  id: string;
  title: string;
  eventColor?: string;
  eventBackgroundColor?: string;
  eventBorderColor?: string;
  eventTextColor?: string;
  eventClassName?: string | string[];
  businessHours?: any;
  parentId?: string;
  eventOverlap?: boolean | Function;
  eventConstraint?: any;
  eventAllow?: Function;
  extendedProps?: { [key: string]: any };
}
