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
import { Button } from '@/components';
import { SingleRating } from '@/features/ratings';
import { useProfileStore } from '@/features/profile';
import { Link } from 'react-router-dom';

interface PastBookingsTableProps {
  pastBookings: BookingT[];
}

const PastBookingsTable: React.FC<PastBookingsTableProps> = ({ pastBookings }) => {
  const { profile } = useProfileStore();

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className='w-[100px]'>Service</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>{profile?.role === 'customer' ? 'Technician' : 'Customer'}</TableHead>
          <TableHead>Rating</TableHead>
          <TableHead>Comments</TableHead>
          <TableHead className='text-right'>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {pastBookings?.length > 0 &&
          pastBookings.map(booking => (
            <TableRow key={booking.booking_id}>
              <TableCell className='font-medium'>{booking.service_name}</TableCell>
              <TableCell>{booking.date}</TableCell>
              <TableCell>
                {profile?.role === 'customer' ? booking.technician_name : booking.client_name}
              </TableCell>
              <TableCell>
                <Link to={`booking/${booking.booking_id}/rating`}>
                  {!booking.rating_score ? (
                    <Button className='w-full bg-primary-100 rounded md:w-1/2  text-white hover:opacity-50'>
                      Add
                    </Button>
                  ) : (
                    <SingleRating rating={Math.round(Number(booking.rating_score))} />
                  )}
                </Link>
              </TableCell>
              <TableCell>{booking.rating_comment}</TableCell>
              <TableCell className='text-right'>{booking.status}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default PastBookingsTable;
