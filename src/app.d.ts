import type { Client } from '@libsql/client';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';
// import type BetterSqlite3 from 'better-sqlite3';
// import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

declare global {
	namespace App {
		interface Locals {
			clientId: string;
		}
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}

	var libSQLClient: Client;
	var libSQLDb: LibSQLDatabase;
	// var betterSQLiteClient: BetterSqlite3.Database;
	// var betterSQLiteDb: BetterSQLite3Database;
}

export {};
