import { getAllServices, createService } from '../src/services/serviceService';

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

async function main() {
  // // Test1
  // for (const service of dummyServices) {
  //   let createdService = await createService(service);
  //   console.log('Created service:', createdService);
  // }
  // //Test2
  // let services = await getAllServices();
  // console.log(services);
  // //Test3
  // let techServices = await getTechnicianServices(techId);
}

main()
  .catch(err => {
    console.error('Error running script:', err);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
