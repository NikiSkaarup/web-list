import shared from '../shared';

export default async (itemPath: string) => {
	const input = `${shared.baseUrl}/rss/refreshItem`;
	const response = await fetch(`${input}?itemPath=${itemPath}`, {
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
