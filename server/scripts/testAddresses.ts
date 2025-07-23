// scripts/testUserQueries.ts

import { createUser, getUserIdByEmail } from '../src/services/userService';
import {
  createAddress,
  getUserAddresses,
} from '../src/services/addressService';

import prisma from '../src/config/prisma';

const userCreationObj = {
  first_name: 'Bob',
  last_name: 'Thebuilder',
  email: 'herewego@example.com',
  phone: '123-456-7890',
  password: 'hashed_pw_123',
};

const addressCreationObj = {
  userId: '',
  street: 'main st',
  city: 'south park',
  state: 'CO',
  zip: '54321',
};

async function main() {
  // //Set up, create user
  // const user = await createUser(userCreationObj);
  // //Test 1: create an address for the user
  // addressCreationObj.userId = user.id;
  // const address_one = await createAddress(addressCreationObj);
  // console.log('Address one creation done: ');
  // addressCreationObj.street = 'elm st';
  // await createAddress(addressCreationObj);
  // console.log('Address two creation done: ');
  // //Test 2: get a user's address by user ID
  // const userId = await getUserIdByEmail(userCreationObj.email);
  // const userAddresses = await getUserAddresses(userId!); //! at the end saying i know it won't be null
  // console.log(userAddresses);
}

main()
  .catch(err => {
    console.error('Error running script:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
