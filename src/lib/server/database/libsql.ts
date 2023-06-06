import { env } from '$env/dynamic/private';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const client =
	global.libSQLClient ||
	createClient({ url: env.DATABASE_URL!, authToken: env.DATABASE_AUTH_TOKEN });

client.execute('PRAGMA journal_mode = WAL');
const db = global.libSQLDb || drizzle(client, { logger: env.DATABASE_VERBOSE === 'true' });

if (process.env.NODE_ENV === 'development') {
	global.libSQLDb = db;
	global.libSQLClient = client;
}

export default {
	db,
	client
};
