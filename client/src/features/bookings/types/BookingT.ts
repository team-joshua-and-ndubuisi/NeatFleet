interface UserT {
  first_name: string;
  last_name: string;
}

interface TechnicianT {
  user: UserT;
}

export interface BookingT {
  id: string;
  user_id: string;
  service_id: string;
  technician_id: string;
  service_date: string;
  time_block: string;
  address_street: string;
  address_city: string;
  address_state: string;
  address_zip: string;
  service_status: 'scheduled' | 'in_progress' | 'completed' | 'cancelled';
  service_notes: string;
  payment_status: string;
  created_at: string;
  rating_score: number;
  rating_comment: string | null;
  user: UserT;
  technician: TechnicianT;
}
