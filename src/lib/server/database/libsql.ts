import { env } from '$env/dynamic/private';
import { createClient } from '@libsql/client';
import { drizzle } from 'drizzle-orm/libsql';

const client =
	global.libSQLClient ||
	createClient({ url: env.DATABASE_URL!, authToken: env.DATABASE_AUTH_TOKEN });

await client.execute(`PRAGMA journal_mode = WAL`);
await client.execute(`PRAGMA synchronous = NORMAL`);
await client.execute(`PRAGMA auto_vacuum = INCREMENTAL`);
await client.execute(`PRAGMA wal_autocheckpoint = 1000`);

const db = global.libSQLDb || drizzle(client, { logger: env.DATABASE_VERBOSE === 'true' });

if (process.env.NODE_ENV === 'development') {
	global.libSQLDb = db;
	global.libSQLClient = client;
}

if(global.libSQLInterval !== undefined) {
	clearInterval(global.libSQLInterval);
	global.libSQLInterval = undefined;
}

if(global.libSQLIntervalRunning === undefined) {
	global.libSQLIntervalRunning = false;
}

const interval = 1000 * 60 * 30;

global.libSQLInterval = setInterval(() => {
	if (global.libSQLIntervalRunning) return;

	try {
		global.libSQLIntervalRunning = true;
		global.libSQLClient.execute('PRAGMA incremental_vacuum');
		global.libSQLClient.execute('PRAGMA optimize');
	} finally {
		global.libSQLIntervalRunning = false;
	}
}, interval);

export default {
	db,
	client
};
