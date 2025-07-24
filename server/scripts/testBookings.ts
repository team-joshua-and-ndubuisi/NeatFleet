import {
  createBooking,
  getAllUserBookings,
  getAllTechnicianBookings,
  rateBooking,
} from '../src/services/bookingService';
import { createAddress } from '../src/services/addressService';
import { createUser, getUserIdByEmail } from '../src/services/userService';
import { getTechIdByEmail } from '../src/services/technicianService';
import { ServiceStatus, PaymentStatus } from '../generated/prisma';

import prisma from '../src/config/prisma';

const technicianUserObj = {
  first_name: 'Bob',
  last_name: 'Thebuilder',
  email: 'herewego@example.com',
  phone: '123-456-7890',
  password: 'hashed_pw_123',
};

const customerUserObj = {
  first_name: 'Joe',
  last_name: 'Swole',
  email: 'buffCleaningMaid@example.com',
  phone: '999-456-7890',
  password: 'hashed_pw_456',
};

const addressCreationObj = {
  userId: '',
  street: '624 Chicken Street',
  city: 'Hill Valley',
  state: 'CA',
  zip: '90210',
};

async function main() {
  // // Setup
  // // 1. create customer user
  // let customerUser = await createUser(customerUserObj);
  // // 2. create address for that customer user
  // addressCreationObj.userId = customerUser.id;
  // let address = await createAddress(addressCreationObj);
  // // 3. get technician id by email
  // const bookingOne = {
  //   userId: '',
  //   serviceId: '',
  //   technicianId: '',
  //   serviceDate: '2025-08-25',
  //   addressStreet: '123 Main St',
  //   addressCity: 'Springfield',
  //   addressState: 'CA',
  //   addressZip: '12345',
  //   serviceNotes: 'Customer requests eco-friendly products.',
  //   serviceStatus: ServiceStatus.scheduled,
  //   paymentStatus: PaymentStatus.paid,
  // };
  // bookingOne.userId = customerUser.id;
  // bookingOne.serviceId = '2603cc04-26b9-4094-8196-ccedee8afe1e'; //quick test
  // bookingOne.technicianId = await getTechIdByEmail(technicianUserObj.email);
  // // TEST 1
  // const booking = await createBooking(bookingOne);
  // console.log(booking);
  // TEST 2
  let theCustomerId = await getUserIdByEmail(customerUserObj.email);
  let customerBookings = await getAllUserBookings(theCustomerId!);
  console.log(customerBookings);
  // // TEST 3
  // // set up
  // let techId = await getTechIdByEmail(technicianUserObj.email);
  // let techBookings = await getAllTechnicianBookings(techId!);
  // console.log(techBookings);
  // TEST 4
  let customerBooking = customerBookings[0].id;
  const RATING_COMMENT = 'Super Clean, love it';
  const RATING_SCORE = 5;
  await rateBooking(customerBooking, RATING_SCORE, RATING_COMMENT);
  // await updateServiceStatus(bookingId, serviceStatus);
  // await updatePaymentStatus(bookingId, paymentStatus);
}

main()
  .catch(err => {
    console.error('Error running script:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
