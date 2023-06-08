import shared from '../shared';

export default async (url: string, path?: string) => {
	const input = `${shared.baseUrl}/rss/addFeed`;

	let params = `url=${url}`;
	if (path) {
		params += `&path=${path}`;
	}

	const response = await fetch(`${input}?${params}`, {
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
