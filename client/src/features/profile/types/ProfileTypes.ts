type UserT = {
  userType: 'admin' | 'tech' | 'client';
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
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
  zip: string;
  id: string;
  isPrimary: boolean;
  latitude?: number;
  longitude?: number;
}
