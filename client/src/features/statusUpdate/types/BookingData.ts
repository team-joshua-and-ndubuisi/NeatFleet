
export type Booking={
  technician: {
    user: {
      first_name: string | undefined | undefined;
      last_name: string | undefined;
    };
  };
  user: {
    first_name: string | undefined;
    last_name: string | undefined;
  };
  address: string | undefined;
  service_status: string | undefined;
  date: string | undefined;
  address_street: string | undefined;
  address_city: string | undefined;
  address_state: string | undefined;
  address_zip: string | undefined;
  time_block: string | undefined;
  service_date: string | undefined;
  payment_status: string | undefined;
  service_id: string | undefined
}

export type BookingProps={
    bookingId: string;
    bookingData?: Booking;
    status?: string;
    data?: string;
    serviceName?: string,
    serviceDescription?: string
  }
