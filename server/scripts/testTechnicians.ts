import { createUser, getUserIdByEmail } from '../src/services/userService';
// import { createTechnician } from '../src/services/technicianService';
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
  // const technician = await createTechnician(userId);

  // //Test 2: check to see if a user is a technician or not
  // const userIsTechnician = await isTechnician();

  // //Test 3
  // const techRating = await getTechnicianRating();

  // //Test 4
  // const allTechRatings = await getAllTechniciansWithRatings();

  // //Test 5 (Need Tweaking, unsure about availabilities)
  // const techAvailability = await getTechnicianAvailabilities();

  // //Test 6
  // await updateRating();
  // const techRating = await getTechnicianRating();
  // console.log(techRating);
}

main()
  .catch(err => {
    console.error('Error running script:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
