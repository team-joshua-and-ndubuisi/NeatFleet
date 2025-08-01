// TODO: this is the shape of the mocked data... probably will need to change this along with the API and hook :(
export interface AvailableDate {
  serviceId: string;
  dates: string[];
}

export interface AvailableTime {
  serviceId: string;
  date: string;
  times: string[];
}
