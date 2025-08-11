import React from 'react';
import { BookingT } from '@/features/profile';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';

interface UpcomingBookingsTable {
  upcomingBookings: BookingT[];
}

const UpcomingBookingsTable: React.FC<UpcomingBookingsTable> = ({ upcomingBookings }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Service</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Customer</TableHead>
          <TableHead className='text-right'>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {upcomingBookings?.length > 0 &&
          upcomingBookings.map(booking => (
            <TableRow key={booking.booking_id}>
              <TableCell className='font-medium'>{booking.service_name}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>{booking.client_name}</TableCell>
              <TableCell className='text-right'>{booking.status}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default UpcomingBookingsTable;
