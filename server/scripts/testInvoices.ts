import { createInvoice, getInvoice } from '../src/services/invoiceService';
import { getAllUserBookings } from '../src/services/bookingService';
import { getUserIdByEmail } from '../src/services/userService';
import prisma from '../src/config/prisma';

const customerUserObj = {
  first_name: 'Joe',
  last_name: 'Swole',
  email: 'buffCleaningMaid@example.com',
};

async function main() {
  //Setup
  const userId = await getUserIdByEmail(customerUserObj.email);
  const bookingId = (await getAllUserBookings(userId!))[0].id;
  // //TEST 1
  // const invoiceInputObj = {
  //   bookingId: '',
  //   cost: 105.23,
  //   taxPercent: 10.25,
  //   totalCost: 0,
  // };
  // invoiceInputObj.bookingId = bookingId;
  // let invoice = await createInvoice(invoiceInputObj);
  // console.log(invoice);

  // TEST 2
  let retreivedInvoice = await getInvoice(bookingId);
  console.log(retreivedInvoice);
}

main()
  .catch(err => {
    console.error('Error running script:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
