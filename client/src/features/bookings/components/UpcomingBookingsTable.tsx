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
import { useProfileStore } from '@/features/profile';
import { Link} from 'react-router-dom'

interface UpcomingBookingsTable {
  upcomingBookings: BookingT[];
}

const UpcomingBookingsTable: React.FC<UpcomingBookingsTable> = ({ upcomingBookings }) => {
  const { profile } = useProfileStore();
  console.log(profile);
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Service</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>{profile?.role === 'customer' ? 'Technician' : 'Customer'}</TableHead>
          <TableHead className='text-right'>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {upcomingBookings?.length > 0 &&
          upcomingBookings.map(booking => (
            <TableRow key={booking.booking_id}>
              <TableCell className='font-medium'>{booking.service_name}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>
                {profile?.role === 'customer' ? booking.technician_name : booking.client_name}
              </TableCell>
              <TableCell className='text-right'>
                <button className='w-full bg-primary-100 rounded md:w-1/2  text-white hover:opacity-50'>
                  <Link to ={`status/${booking.booking_id}`}>
                    {booking.status}
                  </Link>
                </button>

              </TableCell>

            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default UpcomingBookingsTable;
