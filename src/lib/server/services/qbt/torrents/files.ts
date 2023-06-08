import shared from '../shared';

export default async (hash: string, indexes?: string[]) => {
	const input = `${shared.baseUrl}/torrents/files`;

	let params = `hash=${hash}`;

	const indexesToRetrieve = indexes?.join('|');

	if (indexesToRetrieve) {
		params += `&indexes=${encodeURIComponent(indexesToRetrieve)}`;
	}

	const response = await fetch(`${input}?${params}`, {
		method: 'GET',
		headers: {
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: QbtTorrentsFiles[] = await response.json();
	return data;
};
