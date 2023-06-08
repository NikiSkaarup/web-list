import shared from '../shared';

/**
 * Get the download limit.
 * @returns The download limit in bytes per second. 0 means unlimited.
 */
export default async () => {
	const input = `${shared.baseUrl}/transfer/downloadLimit`;

	const response = await fetch(input, {
		method: 'GET'
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data = await response.text();

	return parseInt(data);
};
