import { env } from '$env/dynamic/private';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const client = global.drizzleClient || createClient({ url: env.DATABASE_URL!, authToken: env.DATABASE_AUTH_TOKEN });
const db = global.drizzleDb || drizzle(client);

if (process.env.NODE_ENV === 'development') {
	global.drizzleDb = db;
	global.drizzleClient = client;
}

export default db;
