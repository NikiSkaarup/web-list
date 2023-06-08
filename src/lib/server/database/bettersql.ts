// import { env } from '$env/dynamic/private';
// import { drizzle } from 'drizzle-orm/better-sqlite3';
// import Database from 'better-sqlite3';
// import { dev } from '$app/environment';

// const db_verbose = env.DATABASE_VERBOSE === 'true';
// const verbose = (...data: Array<any>) => {
// 	if (!dev || !db_verbose) return;
// 	console.log(...data);
// };

// const client = global.betterSQLiteClient || new Database(env.DATABASE_URL, { verbose });
// client.pragma('journal_mode = WAL');
// const db = global.betterSQLiteDb || drizzle(client);

// if (process.env.NODE_ENV === 'development') {
// 	global.betterSQLiteDb = db;
// 	global.betterSQLiteClient = client;
// }

// export default {
// 	db,
// 	client
// };
