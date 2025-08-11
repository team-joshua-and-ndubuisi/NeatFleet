export enum ServiceStatusCode {
  'scheduled' = 0,
  'on_the_way' = 1,
  'in_progress' = 2,
  'completed' = 3,
  'cancelled' = 4,
}

export const serviceStatusLabels = {
  [ServiceStatusCode.scheduled]: 'Not Started',
  [ServiceStatusCode.on_the_way]: 'On the Way',
  [ServiceStatusCode.in_progress]: 'In Progress',
  [ServiceStatusCode.completed]: 'Completed',
  [ServiceStatusCode.cancelled]: 'Cancelled',
} as const;
