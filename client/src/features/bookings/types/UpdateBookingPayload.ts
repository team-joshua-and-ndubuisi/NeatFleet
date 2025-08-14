export interface UpdateBookingPayload {
  service_date?: string;
  time_block?: string;
  address_street?: string;
  address_city?: string;
  address_state?: string;
  address_zip?: string;
  service_status?: string;
  service_notes?: string;
  payment_status?: string;
  rating_score?: number;
  rating_comment?: string;
}
