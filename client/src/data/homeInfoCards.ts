export interface InfoCardData {
  title: string;
  lines: string[];
}

const homeInfoCards: InfoCardData[] = [
  {
    title: 'Serivce Hours',
    lines: ['Mon - Fri: 8:00 AM - 8:00 PM', 'Sat: 8:00 AM - 4:00 PM', 'Sun: Closed'],
  },
  {
    title: 'Business Address',
    lines: ['73192 Fleet Avenue', 'Suite 117', 'Dallas, TX 76201'],
  },
  {
    title: 'Contact Information',
    lines: ['Email: contact@neatfleet.com', 'Phone: (972) 456-7890'],
  },
];

export default homeInfoCards;
