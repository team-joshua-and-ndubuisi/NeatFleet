import { createUser, getUserIdByEmail } from '../src/services/userService';
import {
  createTechnician,
  isTechnician,
  getTechnicianRating,
  updateRating,
} from '../src/services/technicianService';
import prisma from '../src/config/prisma';

const userObjOne = {
  first_name: 'Bob',
  last_name: 'Thebuilder',
  email: 'herewego@example.com',
  phone: '123-456-7890',
  password: 'hashed_pw_123',
};

const userObjTwo = {
  first_name: 'Joe',
  last_name: 'Swole',
  email: 'buffCleaningMaid@example.com',
  phone: '999-456-7890',
  password: 'hashed_pw_456',
};

async function main() {
  // //Set up, create user
  // const user = await createUser(userObjOne);

  let userOneId = await getUserIdByEmail(userObjOne.email);
  // //Test 1
  // const technician = await createTechnician(userOneId!);
  // console.log(technician);

  // //Test 2: check to see if a user is a technician or not
  // let userIsTechnician = await isTechnician(userObjOne.email);
  // console.log(userIsTechnician === true); // true
  // userIsTechnician = await isTechnician('randemail@email.com');
  // console.log(userIsTechnician === false); // true

  // //Test 3
  // let techRating = await getTechnicianRating(userOneId!);
  // console.log(techRating);

  // //Test 4
  // const DUMMY_RATING = 4.3;
  // await updateRating(userOneId!, DUMMY_RATING);
  // techRating = await getTechnicianRating(userOneId!);
  // console.log(techRating);

  // //Test 5 (NOT DONE)
  // // setup: create another user and set as technician and give rating
  // let userTwo = await createUser(userObjTwo);
  // let userTwoId = await getuserOneIdByEmail(userObjTwo.email);
  // await createTechnician(userTwoId);
  // const allTechRatings = await getAllTechniciansWithRatings();

  // //Test 6 (NOT DONE, unsure about availabilities)
  // const techAvailability = await getTechnicianAvailabilities();
}

main()
  .catch(err => {
    console.error('Error running script:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
