import { TimeSlot } from '@/features/bookService';
import { Service } from '@/features/services';
import { Technician } from '@/features/technicians';
import { Address, City, State, Apartment, Zipcode } from '@/features/bookService';
import { CardName, CardNumber, CVC, Expiry, Zip } from '@/features/bookService';

export interface FormData {
  service: Service | null;
  date: Date | null;
  timeSlot: TimeSlot | '';
  technician: Technician | null;
  address: Address | null;
  apartment: Apartment | null;
  city: City | null;
  state: State | null;
  zipcode: Zipcode | null;
  cardName: CardName | null;
  cardNumber: CardNumber | null;
  expiry: Expiry | null;
  cvc: CVC | null;
  zip: Zip | null;
}
