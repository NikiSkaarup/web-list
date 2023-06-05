import { env } from '$env/dynamic/private';
// import { createClient } from '@libsql/client';
// import { drizzle } from 'drizzle-orm/libsql';

import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import type BetterSqlite3 from 'better-sqlite3';
import { dev } from '$app/environment';

// const client =
// 	global.drizzleClient ||
// 	createClient({ url: env.DATABASE_URL!, authToken: env.DATABASE_AUTH_TOKEN });
// const db = global.drizzleDb || drizzle(client);

console.log('DATABASE_URL', env.DATABASE_URL);

const db_verbose = env.DATABASE_VERBOSE === 'true';
const verbose = (...data: any[]) => {
	if (dev && db_verbose) {
		console.log(...data);
	}
};

const client = global.drizzleClient || new Database(env.DATABASE_URL, { verbose });
const db = global.drizzleDb || drizzle(client);

if (process.env.NODE_ENV === 'development') {
	global.drizzleDb = db;
	global.drizzleClient = client;
}

export default db;
