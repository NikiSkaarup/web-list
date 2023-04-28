import type { Client } from '@libsql/client';
import type { LibSQLDatabase } from 'drizzle-orm/libsql';

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

	var drizzleClient: Client;
	var drizzleDb: LibSQLDatabase;
}

export {};
