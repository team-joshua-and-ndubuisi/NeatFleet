// type UserT = {
//   userType: 'admin' | 'tech' | 'client';
//   id: string;
//   first_name: string;
//   last_name: string;
//   email: string;
//   phone: string;
// };
// type TechnicianT = {
//   techId: string;
//   techName: string;
//   techRating: number;
// };

export type BookingT = {
  booking_id: string;
  technician_name: string;
  client_name: string;
  service_name: string;
  status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  date: string;
  rating_score: number;
  rating_comment: string;
  // address: string;
};

export interface UserProfileT {
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  role: 'technician' | 'customer';
  rating_score?: number;
  bookings: { past: BookingT[]; upcoming: BookingT[] };
  stats: { bookings_completed: number; years_on_platform: number };
}

export interface AddressT {
  street: string;
  city: string;
  state: string;
  zip: string;
  id: string;
  isPrimary: boolean | string;
  latitude?: number;
  longitude?: number;
}
