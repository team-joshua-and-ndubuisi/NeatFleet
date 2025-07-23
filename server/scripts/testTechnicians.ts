import { createUser, getUserIdByEmail } from '../src/services/userService';
import {
  createTechnician,
  isTechnician,
  getTechnicianRating,
  updateRating,
} from '../src/services/technicianService';
import prisma from '../src/config/prisma';

const userCreationObj = {
  first_name: 'Bob',
  last_name: 'Thebuilder',
  email: 'herewego@example.com',
  phone: '123-456-7890',
  password: 'hashed_pw_123',
};

async function main() {
  // //Set up, create user
  // const user = await createUser(userCreationObj);

  let userId = await getUserIdByEmail(userCreationObj.email);
  // //Test 1
  // const technician = await createTechnician(userId!);
  // console.log(technician);

  // //Test 2: check to see if a user is a technician or not
  // let userIsTechnician = await isTechnician(userCreationObj.email);
  // console.log(userIsTechnician === true); // true
  // userIsTechnician = await isTechnician('randemail@email.com');
  // console.log(userIsTechnician === false); // true

  // //Test 3
  // let techRating = await getTechnicianRating(userId!);
  // console.log(techRating);

  // //Test 4
  // const DUMMY_RATING = 4.3;
  // await updateRating(userId!, DUMMY_RATING);
  // techRating = await getTechnicianRating(userId!);
  // console.log(techRating);

  // //Test 5
  // const allTechRatings = await getAllTechniciansWithRatings();

  // //Test 6 (Need Tweaking, unsure about availabilities)
  // const techAvailability = await getTechnicianAvailabilities();
}

main()
  .catch(err => {
    console.error('Error running script:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
