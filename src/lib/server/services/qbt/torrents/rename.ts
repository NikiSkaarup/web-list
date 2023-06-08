import shared from '../shared';

export default async (hash: QbtHash, name: string) => {
	const input = `${shared.baseUrl}/torrents/rename`;
	const response = await fetch(`${input}?hash=${hash}&name=${encodeURIComponent(name)}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data = await response.text();
	return data;
};
