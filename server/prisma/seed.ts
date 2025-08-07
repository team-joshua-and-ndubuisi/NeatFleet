import prisma from '../src/config/prisma';

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

  // --- USERS ---
  console.log('Creating users...');
  const users = await Promise.all([
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000001',
        first_name: 'Alice',
        last_name: 'Johnson',
        email: 'alice.j@example.com',
        phone: '1112223333',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000002',
        first_name: 'Bob',
        last_name: 'Williams',
        email: 'bob.w@example.com',
        phone: '4445556666',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000003',
        first_name: 'Charlie',
        last_name: 'Brown',
        email: 'charlie.b@example.com',
        phone: '7778889999',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000004',
        first_name: 'Diana',
        last_name: 'Miller',
        email: 'diana.m@example.com',
        phone: '1231231234',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000005',
        first_name: 'Ethan',
        last_name: 'Davis',
        email: 'ethan.d@example.com',
        phone: '4564564567',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000006',
        first_name: 'Fiona',
        last_name: 'Green',
        email: 'fiona.g@example.com',
        phone: '3213214321',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000007',
        first_name: 'George',
        last_name: 'Harris',
        email: 'george.h@example.com',
        phone: '6546547654',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000008',
        first_name: 'Hannah',
        last_name: 'Clark',
        email: 'hannah.c@example.com',
        phone: '9879876543',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000009',
        first_name: 'Ian',
        last_name: 'Lewis',
        email: 'ian.l@example.com',
        phone: '8765432109',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000010',
        first_name: 'Jane',
        last_name: 'Walker',
        email: 'jane.w@example.com',
        phone: '1029384756',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000011',
        first_name: 'Kevin',
        last_name: 'Hall',
        email: 'kevin.h@example.com',
        phone: '1234567890',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000012',
        first_name: 'Laura',
        last_name: 'Allen',
        email: 'laura.a@example.com',
        phone: '0987654321',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000013',
        first_name: 'Michael',
        last_name: 'Scott',
        email: 'michael.s@example.com',
        phone: '1111111111',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000014',
        first_name: 'Dwight',
        last_name: 'Schrute',
        email: 'dwight.s@example.com',
        phone: '2222222222',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000015',
        first_name: 'Jim',
        last_name: 'Halpert',
        email: 'jim.h@example.com',
        phone: '3333333333',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000016',
        first_name: 'Pam',
        last_name: 'Beesly',
        email: 'pam.b@example.com',
        phone: '4444444444',
        password: 'password123',
      },
    }),
    prisma.user.create({
      data: {
        id: '10000000-0000-0000-0000-000000000017',
        first_name: 'Andy',
        last_name: 'Bernard',
        email: 'andy.b@example.com',
        phone: '5555555555',
        password: 'password123',
      },
    }),
  ]);
  console.log('Users created.');

  // --- ADMINS ---
  console.log('Creating admins...');
  await prisma.admin.createMany({
    data: [
        { id: '20000000-0000-0000-0000-000000000001', user_id: users[0].id },
        { id: '20000000-0000-0000-0000-000000000002', user_id: users[1].id },
    ],
  });
  console.log('Admins created.');

  // --- TECHNICIANS ---
  console.log('Creating technicians...');
  const technicians = await Promise.all([
    prisma.technician.create({
      data: {
        id: '40000000-0000-0000-0000-000000000001',
        user_id: users[2].id,
        current_rating: 4.8,
      },
    }),
    prisma.technician.create({
      data: {
        id: '40000000-0000-0000-0000-000000000002',
        user_id: users[3].id,
        current_rating: 4.5,
      },
    }),
    prisma.technician.create({
        data: {
          id: '40000000-0000-0000-0000-000000000003',
          user_id: users[4].id,
          current_rating: 4.9,
        },
      }),
      prisma.technician.create({
        data: {
          id: '40000000-0000-0000-0000-000000000004',
          user_id: users[5].id,
          current_rating: 4.2,
        },
      }),
      prisma.technician.create({
        data: {
          id: '40000000-0000-0000-0000-000000000005',
          user_id: users[12].id,
          current_rating: 4.7,
        },
      }),
      prisma.technician.create({
        data: {
          id: '40000000-0000-0000-0000-000000000006',
          user_id: users[13].id,
          current_rating: 4.6,
        },
      }),
  ]);
  console.log('Technicians created.');

  // --- SERVICES ---
  console.log('Creating services...');
  const services = await Promise.all([
    prisma.service.create({
      data: {
        id: '60000000-0000-0000-0000-000000000001',
        name: 'Standard Cleaning',
        description: 'A standard cleaning service for homes.',
      },
    }),
    prisma.service.create({
      data: {
        id: '60000000-0000-0000-0000-000000000002',
        name: 'Deep Cleaning',
        description: 'A thorough, deep cleaning service.',
      },
    }),
    prisma.service.create({
      data: {
        id: '60000000-0000-0000-0000-000000000003',
        name: 'Window Cleaning',
        description: 'Interior and exterior window cleaning.',
      },
    }),
    prisma.service.create({
        data: {
          id: '60000000-0000-0000-0000-000000000004',
          name: 'Carpet Cleaning',
          description: 'Professional carpet shampooing and stain removal.',
        },
      }),
      prisma.service.create({
        data: {
          id: '60000000-0000-0000-0000-000000000005',
          name: 'Move-in/Move-out Cleaning',
          description: 'Complete cleaning for empty homes.',
        },
      }),
      prisma.service.create({
        data: {
          id: '60000000-0000-0000-0000-000000000006',
          name: 'Upholstery Cleaning',
          description: 'Cleaning of sofas, chairs, and other upholstered furniture.',
        },
      }),
      prisma.service.create({
        data: {
          id: '60000000-0000-0000-0000-000000000007',
          name: 'Gutter Cleaning',
          description: 'Removal of debris from gutters and downspouts.',
        },
      }),
  ]);
  console.log('Services created.');

  // --- TECHNICIAN SERVICES ---
  console.log('Linking technicians to services...');
  await prisma.technicianService.createMany({
    data: [
      { technician_id: technicians[0].id, service_id: services[0].id },
      { technician_id: technicians[0].id, service_id: services[1].id },
      { technician_id: technicians[0].id, service_id: services[2].id },
      { technician_id: technicians[1].id, service_id: services[0].id },
      { technician_id: technicians[1].id, service_id: services[1].id },
      { technician_id: technicians[2].id, service_id: services[3].id },
      { technician_id: technicians[2].id, service_id: services[4].id },
      { technician_id: technicians[3].id, service_id: services[0].id },
      { technician_id: technicians[3].id, service_id: services[3].id },
      { technician_id: technicians[4].id, service_id: services[5].id },
      { technician_id: technicians[4].id, service_id: services[6].id },
      { technician_id: technicians[5].id, service_id: services[0].id },
      { technician_id: technicians[5].id, service_id: services[1].id },
      { technician_id: technicians[5].id, service_id: services[5].id },
    ],
  });
  console.log('Technicians linked to services.');

  // --- TECHNICIAN AVAILABILITIES ---
  console.log('Creating technician availabilities...');
  await prisma.technicianAvailability.createMany({
    data: [
      // Tech 1
      { technician_id: technicians[0].id, available_date: '2025-08-15', time_block: 'morning' },
      { technician_id: technicians[0].id, available_date: '2025-08-15', time_block: 'afternoon' },
      { technician_id: technicians[0].id, available_date: '2025-08-16', time_block: 'morning' },
      // Tech 2
      { technician_id: technicians[1].id, available_date: '2025-08-15', time_block: 'evening' },
      { technician_id: technicians[1].id, available_date: '2025-08-17', time_block: 'afternoon' },
      { technician_id: technicians[1].id, available_date: '2025-08-17', time_block: 'evening' },
      // Tech 3
      { technician_id: technicians[2].id, available_date: '2025-08-18', time_block: 'morning' },
      { technician_id: technicians[2].id, available_date: '2025-08-18', time_block: 'afternoon' },
      // Tech 4
      { technician_id: technicians[3].id, available_date: '2025-08-19', time_block: 'morning' },
      { technician_id: technicians[3].id, available_date: '2025-08-19', time_block: 'evening' },
      // Tech 5
      { technician_id: technicians[4].id, available_date: '2025-08-20', time_block: 'morning' },
      { technician_id: technicians[4].id, available_date: '2025-08-20', time_block: 'afternoon' },
      { technician_id: technicians[4].id, available_date: '2025-08-21', time_block: 'morning' },
      // Tech 6
      { technician_id: technicians[5].id, available_date: '2025-08-20', time_block: 'evening' },
      { technician_id: technicians[5].id, available_date: '2025-08-22', time_block: 'afternoon' },
      { technician_id: technicians[5].id, available_date: '2025-08-22', time_block: 'evening' },
    ],
  });
  console.log('Technician availabilities created.');

  // --- ADDRESSES ---
  console.log('Creating addresses...');
  await prisma.address.createMany({
    data: [
      {
        user_id: users[6].id,
        street: '789 Pine St',
        city: 'Mapleton',
        state: 'FL',
        zip: '33101',
        isPrimary: true,
      },
      {
        user_id: users[7].id,
        street: '101 Maple Ave',
        city: 'Oakville',
        state: 'WA',
        zip: '98568',
        isPrimary: true,
      },
      {
        user_id: users[8].id,
        street: '212 Birch Rd',
        city: 'Cedarville',
        state: 'CA',
        zip: '96104',
        isPrimary: true,
      },
      {
        user_id: users[9].id,
        street: '333 Spruce Ln',
        city: 'Pinecrest',
        state: 'OR',
        zip: '97049',
        isPrimary: true,
      },
      {
        user_id: users[10].id,
        street: '456 Oak St',
        city: 'Springfield',
        state: 'IL',
        zip: '62704',
        isPrimary: true,
      },
      {
        user_id: users[11].id,
        street: '789 Elm St',
        city: 'Riverside',
        state: 'CA',
        zip: '92501',
        isPrimary: true,
      },
      {
        user_id: users[14].id,
        street: '123 Main St',
        city: 'Scranton',
        state: 'PA',
        zip: '18503',
        isPrimary: true,
      },
      {
        user_id: users[15].id,
        street: '456 High St',
        city: 'Scranton',
        state: 'PA',
        zip: '18503',
        isPrimary: true,
      },
      {
        user_id: users[16].id,
        street: '789 Low St',
        city: 'Scranton',
        state: 'PA',
        zip: '18503',
        isPrimary: true,
      },
    ],
  });
  console.log('Addresses created.');

  // --- BOOKINGS ---
  console.log('Creating bookings...');
  const bookings = await Promise.all([
    prisma.booking.create({
      data: {
        id: '70000000-0000-0000-0000-000000000001',
        user_id: users[6].id,
        service_id: services[0].id,
        technician_id: technicians[0].id,
        service_date: '2025-08-15',
        time_block: 'morning',
        address_street: '789 Pine St',
        address_city: 'Mapleton',
        address_state: 'FL',
        address_zip: '33101',
      },
    }),
    prisma.booking.create({
      data: {
        id: '70000000-0000-0000-0000-000000000002',
        user_id: users[7].id,
        service_id: services[1].id,
        technician_id: technicians[1].id,
        service_date: '2025-08-17',
        time_block: 'afternoon',
        address_street: '101 Maple Ave',
        address_city: 'Oakville',
        address_state: 'WA',
        address_zip: '98568',
      },
    }),
    prisma.booking.create({
        data: {
          id: '70000000-0000-0000-0000-000000000003',
          user_id: users[8].id,
          service_id: services[3].id,
          technician_id: technicians[2].id,
          service_date: '2025-08-18',
          time_block: 'morning',
          address_street: '212 Birch Rd',
          address_city: 'Cedarville',
          address_state: 'CA',
          address_zip: '96104',
        },
      }),
      prisma.booking.create({
        data: {
          id: '70000000-0000-0000-0000-000000000004',
          user_id: users[9].id,
          service_id: services[0].id,
          technician_id: technicians[3].id,
          service_date: '2025-08-19',
          time_block: 'evening',
          address_street: '333 Spruce Ln',
          address_city: 'Pinecrest',
          address_state: 'OR',
          address_zip: '97049',
        },
      }),
      prisma.booking.create({
        data: {
          id: '70000000-0000-0000-0000-000000000005',
          user_id: users[14].id,
          service_id: services[5].id,
          technician_id: technicians[4].id,
          service_date: '2025-08-20',
          time_block: 'morning',
          address_street: '123 Main St',
          address_city: 'Scranton',
          address_state: 'PA',
          address_zip: '18503',
        },
      }),
      prisma.booking.create({
        data: {
          id: '70000000-0000-0000-0000-000000000006',
          user_id: users[15].id,
          service_id: services[6].id,
          technician_id: technicians[4].id,
          service_date: '2025-08-21',
          time_block: 'morning',
          address_street: '456 High St',
          address_city: 'Scranton',
          address_state: 'PA',
          address_zip: '18503',
        },
      }),
  ]);
  console.log('Bookings created.');

  // --- INVOICES ---
  console.log('Creating invoices...');
  await prisma.invoice.createMany({
    data: [
      {
        booking_id: bookings[0].id,
        cost: 120.0,
        tax_percent: 7.5,
        total_cost: 129.0,
      },
      {
        booking_id: bookings[1].id,
        cost: 200.0,
        tax_percent: 9.0,
        total_cost: 218.0,
      },
      {
        booking_id: bookings[2].id,
        cost: 150.0,
        tax_percent: 8.5,
        total_cost: 162.75,
      },
      {
        booking_id: bookings[3].id,
        cost: 100.0,
        tax_percent: 6.0,
        total_cost: 106.0,
      },
      {
        booking_id: bookings[4].id,
        cost: 180.0,
        tax_percent: 6.0,
        total_cost: 190.8,
      },
      {
        booking_id: bookings[5].id,
        cost: 250.0,
        tax_percent: 6.0,
        total_cost: 265.0,
      },
    ],
  });
  console.log('Invoices created.');

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
