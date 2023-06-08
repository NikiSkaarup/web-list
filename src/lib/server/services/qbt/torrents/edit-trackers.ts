import shared from '../shared';

export default async (hash: QbtHash, origUrl: string, newUrl: string) => {
	const input = `${shared.baseUrl}/torrents/editTracker`;
	const response = await fetch(`${input}?hash=${hash}&origUrl=${origUrl}&newUrl=${newUrl}`, {
		method: 'GET',
		headers: {
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data = await response.text();
	return data;
};
