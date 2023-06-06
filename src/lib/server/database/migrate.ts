import dotenv from 'dotenv';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';
import { migrate } from 'drizzle-orm/libsql/migrator';
// import { drizzle } from 'drizzle-orm/better-sqlite3';
// import { migrate } from 'drizzle-orm/better-sqlite3/migrator';
// import Database from 'better-sqlite3';
import { z } from 'zod';

const conf = dotenv.config();
if (conf.parsed === undefined) throw new Error('dotenv config failed');

const schema = z.object({
	DATABASE_URL: z.string().min(1),
	DATABASE_AUTH_TOKEN: z.string().min(1).optional()
});

const envs = schema.parse(conf.parsed);

const client = createClient({ url: envs.DATABASE_URL, authToken: envs.DATABASE_AUTH_TOKEN });
// const client = Database(envs.DATABASE_URL);
export const db = drizzle(client);

async function main() {
	await migrate(db, {
		migrationsFolder: './migrations'
	});
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
