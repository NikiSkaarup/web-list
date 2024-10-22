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

	var libSQLClient: Client;
	var libSQLDb: LibSQLDatabase;
	var libSQLInterval: NodeJS.Timeout | string | number | undefined;
	var libSQLIntervalRunning: boolean;
}

export {};
