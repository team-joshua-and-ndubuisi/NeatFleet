import { createUser, getUserIdByEmail } from '../src/services/userService';
import {
  createTechnician,
  isTechnician,
  getTechnicianRating,
  updateRating,
  setTechnicianAvailability,
  getTechAvailabilities,
  getTechIdByEmail,
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
  //setup
  let techId = await getTechIdByEmail(userObjOne.email);
  let availabilityObj = {
    techId,
    availableDate: '2025-07-25',
    startTime: '09:00:00',
    endTime: '17:00:00',
  };
  // //Test 1
  // let setUpavailability = await setTechnicianAvailability(availabilityObj);
  // console.log(setUpavailability);

  // //Test 2
  // let availability = await getTechAvailabilities(techId!);
  // console.log(availability);
}

main()
  .catch(err => {
    console.error('Error running script:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
