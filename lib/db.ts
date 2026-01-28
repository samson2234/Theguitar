import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import pg from "pg";

declare global {
    var prisma: PrismaClient | undefined;
}

const connectionString = process.env.DATABASE_URL;

// Supabase pool settings
const pool = new pg.Pool({
    connectionString,
    ssl: { rejectUnauthorized: false }
});

const adapter = new PrismaPg(pool);
export const db = globalThis.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;
