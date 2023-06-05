// import type { Client } from '@libsql/client';
// import type { LibSQLDatabase } from 'drizzle-orm/libsql';
import type BetterSqlite3 from 'better-sqlite3';
import type { BetterSQLite3Database } from 'drizzle-orm/better-sqlite3';

declare global {
	namespace App {
		interface Locals {
			requestStart: number;
			requestDuration: number;
		}
		// interface Error {}
		// interface PageData {}
		// interface Platform {}
	}

	// var drizzleClient: Client;
	//var drizzleDb: LibSQLDatabase;
	var drizzleClient: BetterSqlite3.Database;
	var drizzleDb: BetterSQLite3Database;
}

export {};
