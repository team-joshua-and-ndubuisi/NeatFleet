import { PrismaClient } from '../../generated/prisma';

const prisma = new PrismaClient({
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

export default prisma;
