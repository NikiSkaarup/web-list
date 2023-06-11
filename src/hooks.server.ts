import { dev } from '$app/environment';
import qbt from '$lib/server/services/qbt';
import clientManager, { sessionTimeout } from '$lib/server/services/qbt/auth/client-manager';
import logger from '$lib/server/utils/logger';
import { nanoid } from 'nanoid';

// needs to automatically be deleted after sessionTimeout currently it is a memory leak
const indexes = new Map<string, number>();

export const handle = async ({ event, resolve }) => {
	let clientId = event.cookies.get('web-list-client-id');
	if (!clientId) {
		clientId = nanoid();
	}

	event.locals.clientId = clientId;

	event.cookies.set('web-list-client-id', clientId, {
		path: '/',
		sameSite: 'strict',
		maxAge: sessionTimeout,
		secure: !dev
	});

	await clientManager.get(event.locals.clientId, qbt.auth.login);

	let index = indexes.get(clientId);
	if (index === undefined) {
		index = 0;
		indexes.set(clientId, index);
	}

	if (dev) {
		indexes.set(clientId, index + 1);
		const id = String(index).padStart(3, '0');
		logger.debug(`${clientId} // ${id} started`);
		const requestStart = performance.now();
		const result = await resolve(event);
		const requestEnd = performance.now();
		const duration = requestEnd - requestStart;
		logger.debug(`${clientId} // ${id} took ${duration.toFixed(2)}ms`);
		return result;
	}

	const result = await resolve(event);
	return result;
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
		if (error instanceof Error) {
			message = error.message;
		} else if (typeof error === 'string') {
			message = error;
		}

		logger.error(message, event);
	}

	return {
		message
	};
};
