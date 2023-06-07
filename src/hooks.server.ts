import { dev } from '$app/environment';
import database from '$lib/server/database';
import { items } from '$lib/server/database/schema';
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
	// if (!dev && request.url.startsWith('http://localhost:5163')) {
	// 	request = new Request(
	// 		request.url.replace('http://localhost:5163', 'http://localhost:80'),
	// 		request
	// 	);
	// }

	return fetch(request);
};

export const handleError = ({ error, event }) => {
	let message = 'Whoops!';
	if (dev) {
		console.error(error);
		if (error instanceof Error) {
			message = error.message;
		} else if (typeof error === 'string') {
			message = error;
		}

		if (event.request.url.includes('debug')) {
			console.log(event);
		}
	}

	return {
		message
	};
};
