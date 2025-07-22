// scripts/testUserQueries.ts

import { createUser } from '../src/services/userService';

import { setUserAsAdmin, isAdmin } from '../src/services/adminService';

import prisma from '../src/config/prisma';

const userCreationObj = {
  first_name: 'Bob',
  last_name: 'Thebuilder',
  email: 'herewego@example.com',
  phone: '123-456-7890',
  password: 'hashed_pw_123',
};

async function main() {
  //Set up, create user
  const user = await createUser(userCreationObj);
  //Test 1: create an address for the user

  //Test 2: get a user's address by user ID
}

main()
  .catch(err => {
    console.error('Error running script:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
