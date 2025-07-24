import { getAllServices, createService } from '../src/services/serviceService';
import {
  addServiceToTechnician,
  getTechnicianServices,
} from '../src/services/serviceService';
import { getTechIdByEmail } from '../src/services/technicianService';

import prisma from '../src/config/prisma';
const dummyServices = [
  {
    name: 'Deep Cleaning',
    description:
      'Thorough top-to-bottom cleaning including hard-to-reach areas.',
  },
  {
    name: 'Standard Cleaning',
    description: 'Regular cleaning of living spaces, kitchen, and bathroom.',
  },
  {
    name: 'Move-Out Cleaning',
    description: 'Detailed cleaning to prepare property for new occupants.',
  },
];

const userObjOne = {
  first_name: 'Bob',
  last_name: 'Thebuilder',
  email: 'herewego@example.com',
  phone: '123-456-7890',
  password: 'hashed_pw_123',
};

async function main() {
  // Set up
  const techId = await getTechIdByEmail(userObjOne.email);
  // // Test1
  // for (const service of dummyServices) {
  //   let createdService = await createService(service);
  //   console.log('Created service:', createdService);
  // }

  // // Test2
  // const services = await getAllServices();
  // console.log(services);

  // // Test3 - Link all services to a technician
  // for (const service of services) {
  //   await addServiceToTechnician(techId, service.id);
  // }

  //   // Test 4
  //   let techServices = await getTechnicianServices(techId);
  //   console.log(techServices);
}

main()
  .catch(err => {
    console.error('Error running script:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
