import { dev } from '$app/environment';
import database from '$lib/server/database';
import { items } from '$lib/server/database/schema';
import logger from '$lib/server/utils/logger';
import { sql } from 'drizzle-orm';

export const handle = async ({ event, resolve }) => {
	if (!global.libSQLClient) {
		database.db
			.select({ count: sql`count(*)` })
			.from(items)
			.get();
	}

	event.locals.requestStart = performance.now();
	return resolve(event);
};

export const handleFetch = async ({ request, fetch }) => {
	return fetch(request);
};

export const handleError = ({ error, event }) => {
	let message = 'Whoops!';

	if (dev) {
		logger.debug('debug {error} {event}', { error, event });
		if (error instanceof Error) {
			message = error.message;
		} else if (typeof error === 'string') {
			message = error;
		}

		return { message };
	}

	logger.error('error {error}', { error });

	return { message };
};
