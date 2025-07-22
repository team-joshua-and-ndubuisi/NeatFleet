// scripts/testUserQueries.ts

import {
  createUser,
  getUserIdByEmail,
  deactivateUserByEmail,
} from '../src/services/userService';

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
  const { email, first_name } = userCreationObj;
  // //Test 1, user creation, now check the database to see if what you created is there
  // const user = await createUser(userCreationObj);
  // console.log('Created user:', user);

  // //Test 2, get user id by email address
  // const userId = await  getUserIdByEmail(email);
  // console.log(`User id for ${first_name} with the email ${email} is: ${userId}`);

  // //Test 3, remove user (setting is_active flag s false)
  // const user = await deactivateUserByEmail(email);
  // console.log(`User with the email ${user.email} is now set as inactive`);

  // //Test 4. set up admin (mvp doesn't need the func, this is for seed data set up)
  // const admin = await setUserAsAdmin(email);
  // console.log(`User with the email ${email} is now set as an admin`);

  // //Test 5, given an email, check to see if the user is an admin
  // const isUserAdmin = await isAdmin(email);
  // console.log(`User with the email ${email} is an admin`);
}

main()
  .catch(err => {
    console.error('Error running script:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
