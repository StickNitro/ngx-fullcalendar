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
}
