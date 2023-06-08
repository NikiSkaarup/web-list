import shared from '../shared';

export default async (hash: string) => {
	const input = `${shared.baseUrl}/torrents/trackers`;

	const response = await fetch(`${input}?hash=${hash}`, {
		method: 'GET',
		headers: {
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: QbtTorrentsTrackers[] = await response.json();
	return data;
};
