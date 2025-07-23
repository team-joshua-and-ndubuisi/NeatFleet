// scripts/testUserQueries.ts

import { createUser } from '../src/services/userService';
import { createAddress } from '../src/services/addressService';

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
  //Set up, create user
  const user = await createUser(userCreationObj);
  //Test 1: create an address for the user
  addressCreationObj.userId = user.id;
  const address = await createAddress(addressCreationObj);

  //Test 2: get a user's address by user ID
}

main()
  .catch(err => {
    console.error('Error running script:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
