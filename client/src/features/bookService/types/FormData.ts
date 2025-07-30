import { TimeSlot } from '@/features/bookService';
import { Service } from '@/features/services';
import { Technician } from '@/features/technicians';

export interface FormData {
  service: Service | null;
  date: Date | null;
  timeSlot: TimeSlot | '';
  technician: Technician | null;
}
