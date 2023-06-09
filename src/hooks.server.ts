import { dev } from '$app/environment';

let i = 1;

export const handle = async ({ event, resolve }) => {
	if (dev) {
		const id = String(i++).padStart(3, '0');
		console.log(`Request ${id} started`);
		const requestStart = performance.now();
		const result = await resolve(event);
		const requestEnd = performance.now();
		const duration = requestEnd - requestStart;
		console.log(`Request ${id} took ${duration.toFixed(2)}ms`);
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
