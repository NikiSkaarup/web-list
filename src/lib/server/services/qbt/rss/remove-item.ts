import shared from '../shared';

export default async (path: string) => {
	const input = `${shared.baseUrl}/rss/removeItem`;
	const response = await fetch(`${input}?path=${path}`, {
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
