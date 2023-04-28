import { dev } from '$app/environment';
import db from '$lib/server/db';
import { items } from '$lib/server/db/schema';
import { sql } from 'drizzle-orm';

const stringReplace = (str: string, toFind: string, replaceValue: string) => {
	const index = str.indexOf(toFind);
	if (index === -1) {
		return str;
	}

	return str.substring(0, index) + replaceValue + str.substring(index + toFind.length);
};

export const handle = async ({ event, resolve }) => {
	if (!global.drizzleDb) {
		db.select({ count: sql`count(*)` })
			.from(items)
			.get();
	}

	event.locals.requestStart = performance.now();
	return resolve(event, {
		transformPageChunk: ({ html }) =>
			stringReplace(
				html,
				'%request_duration%',
				(performance.now() - event.locals.requestStart).toFixed(3)
			)
	});
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
