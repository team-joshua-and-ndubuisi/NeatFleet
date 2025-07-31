
import { PrismaClient } from '../generated/prisma';

const prisma = new PrismaClient();

async function main() {
  // Clean up existing data
  console.log('Cleaning up database...');
  await prisma.invoice.deleteMany();
  await prisma.technicianService.deleteMany();
  await prisma.technicianAvailability.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.address.deleteMany();
  await prisma.admin.deleteMany();
  await prisma.technician.deleteMany();
  await prisma.service.deleteMany();
  await prisma.user.deleteMany();
  console.log('Database cleaned.');

  // Create Users
  const user1 = await prisma.user.create({
    data: {
      id: '10000000-0000-0000-0000-000000000001',
      first_name: 'John',
      last_name: 'Doe',
      email: 'john.doe@example.com',
      phone: '1234567890',
      password: 'password123',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      id: '10000000-0000-0000-0000-000000000002',
      first_name: 'Jane',
      last_name: 'Smith',
      email: 'jane.smith@example.com',
      phone: '0987654321',
      password: 'password456',
    },
  });

  // Create Admin
  await prisma.admin.create({
    data: {
      id: '20000000-0000-0000-0000-000000000001',
      user_id: user1.id,
    },
  });

  // Create Addresses
  await prisma.address.create({
    data: {
      id: '30000000-0000-0000-0000-000000000001',
      user_id: user1.id,
      street: '123 Main St',
      city: 'Anytown',
      state: 'CA',
      zip: '12345',
      isPrimary: true,
    },
  });

  await prisma.address.create({
    data: {
      id: '30000000-0000-0000-0000-000000000002',
      user_id: user2.id,
      street: '456 Oak Ave',
      city: 'Someville',
      state: 'TX',
      zip: '67890',
    },
  });

  // Create Technicians
  const technician1 = await prisma.technician.create({
    data: {
      id: '40000000-0000-0000-0000-000000000001',
      user_id: user1.id,
      current_rating: 4.5,
    },
  });

  // Create Technician Availability
  await prisma.technicianAvailability.create({
    data: {
      id: '50000000-0000-0000-0000-000000000001',
      technician_id: technician1.id,
      available_date: '2025-09-10',
      start_time: '09:00:00',
      end_time: '17:00:00',
    },
  });

  // Create Services
  const service1 = await prisma.service.create({
    data: {
      id: '60000000-0000-0000-0000-000000000001',
      name: 'Standard Cleaning',
      description: 'A standard cleaning service.',
    },
  });

  const service2 = await prisma.service.create({
    data: {
      id: '60000000-0000-0000-0000-000000000002',
      name: 'Deep Cleaning',
      description: 'A deep cleaning service.',
    },
  });

  // Link Technicians to Services
  await prisma.technicianService.create({
    data: {
      technician_id: technician1.id,
      service_id: service1.id,
    },
  });

  await prisma.technicianService.create({
    data: {
      technician_id: technician1.id,
      service_id: service2.id,
    },
  });

  // Create Bookings
  const booking1 = await prisma.booking.create({
    data: {
      id: '70000000-0000-0000-0000-000000000001',
      user_id: user2.id,
      service_id: service1.id,
      technician_id: technician1.id,
      service_date: '2025-09-10',
      service_time: '14:00:00',
      address_street: '456 Oak Ave',
      address_city: 'Someville',
      address_state: 'TX',
      address_zip: '67890',
      service_status: 'scheduled',
      payment_status: 'paid',
    },
  });

  const booking2 = await prisma.booking.create({
    data: {
      id: '70000000-0000-0000-0000-000000000002',
      user_id: user1.id,
      service_id: service2.id,
      technician_id: technician1.id,
      service_date: '2025-09-12',
      service_time: '09:30:00',
      address_street: '123 Main St',
      address_city: 'Anytown',
      address_state: 'CA',
      address_zip: '12345',
      service_status: 'scheduled',
      payment_status: 'paid',
    },
  });

  // Create Invoices
  await prisma.invoice.create({
    data: {
      id: '80000000-0000-0000-0000-000000000001',
      booking_id: booking1.id,
      cost: 100.0,
      tax_percent: 8.25,
      total_cost: 108.25,
    },
  });

  await prisma.invoice.create({
    data: {
      id: '80000000-0000-0000-0000-000000000002',
      booking_id: booking2.id,
      cost: 150.0,
      tax_percent: 8.25,
      total_cost: 162.38,
    },
  });

  console.log('Seed data created successfully!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
