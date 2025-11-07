import { PrismaClient } from '@prisma/client/edge';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';

// Create a connection pool
const connectionString = process.env.DATABASE_URL || '';
const pool = new Pool({ connectionString });

// Create the Prisma client with the PostgreSQL adapter
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export { prisma };

export default prisma;
