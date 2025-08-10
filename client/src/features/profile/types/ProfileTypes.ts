type BookingT = {
  booking_id: string;
  client_name: string;
  date: string;
  rating_comment: string;
  rating_score: number;
  service_name: string;
  status: string;
};

type BookingsT = {
  past: BookingT[];
  upcoming: BookingT[];
};

type StatsT = {
  bookings_completed: number;
  years_on_platform: number;
};

type UserT = {
  role: 'admin' | 'technician' | 'client';
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  rating_score: string;
  bookings: BookingsT;
  stats: StatsT;
};
// type TechnicianT = {
//   techId: string;
//   techName: string;
//   techRating: number;
// };

// type BookingT = {
//   bookingId: string;
//   serviceId: string;
//   serviceName: string;
//   date: string;
//   time: string;
//   address: string;
//   status: string;
// };

export interface UserProfileT {
  user: UserT;
}

export interface AddressT {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}
