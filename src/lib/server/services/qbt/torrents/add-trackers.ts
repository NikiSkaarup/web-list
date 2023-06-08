import shared from '../shared';

export default async (hash: QbtHash, urls: Array<string>) => {
	const input = `${shared.baseUrl}/torrents/addTracker`;
	const urlsToAdd = urls.join('&');
	const response = await fetch(`${input}?hash=${hash}&urls=${encodeURIComponent(urlsToAdd)}`, {
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
