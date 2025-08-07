import { TimeSlot } from '@/features/bookService';
import { Service } from '@/features/services';
import { Technician } from '@/features/technicians';
import { Address, City, State, Apartment, Zipcode } from '@/features/bookService';

export interface FormData {
  service: Service | null;
  date: Date | null;
  timeSlot: TimeSlot | null;
  technician: Technician | null;
  address: Address | null;
  apartment: Apartment | null;
  city: City | null;
  state: State | null;
  zipcode: Zipcode | null;
}
export interface SubmissionData {
  user_id: string | undefined | null;
  service_id: string | undefined | null;
  technician_id: string | undefined | null;
  service_date: string | undefined | null;
  time_block: string | undefined | null;
  address_street: string | undefined | null;
  address_city: string | undefined | null;
  address_state: string | undefined | null;
  address_zip: string | undefined | null;
  service_notes: string | undefined | null;
}
export type FormFieldKey = keyof FormData;
export type FormFieldValue<K extends FormFieldKey> = FormData[K];
