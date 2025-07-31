type UserT = {
  userType: 'admin' | 'tech' | 'client';
  userId: string;
  name: string;
};
type TechnicianT = {
  techId: string;
  techName: string;
  techRating: number;
};

type BookingT = {
  bookingId: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  address: string;
  status: string;
};

export interface UserProfileT {
  user: UserT;
  technician: TechnicianT;
  bookings: BookingT[];
}

export interface AddressT {
  street: string;
  city: string;
  state: string;
  zipCode: string;
}
