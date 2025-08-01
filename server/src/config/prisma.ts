import { PrismaClient, Prisma } from '../../generated/prisma';

//Allows hotrealod with singleton setup
const globalForPrisma = global as unknown as {
  prisma: PrismaClient<Prisma.PrismaClientOptions, 'query'>;
};

const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: [{ emit: 'event', level: 'query' }],
  });

prisma.$on('query', e => {
  // Filter out common non-essential queries
  const ignored = ['BEGIN', 'COMMIT', 'DEALLOCATE ALL'];

  if (!ignored.includes(e.query.trim().toUpperCase())) {
    console.log('Query:', e.query);
    console.log('Params:', e.params);
  }
});

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;

export default prisma;
