import { User } from '@/features/users';

export interface Technician {
  id: string;
  current_rating: number;
  user: User;
}

export interface TechnicianAvailabilityI {
  availableDate: string;
  timeBlock: string[];
}

export interface TechnicianAvailabilityFormatI {
  availableDate: string;
  timeBlock: string;
}
