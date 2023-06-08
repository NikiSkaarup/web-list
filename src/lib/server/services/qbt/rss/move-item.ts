import shared from '../shared';

export default async (itemPath: string, destPath: string) => {
	const input = `${shared.baseUrl}/rss/moveItem`;
	const response = await fetch(`${input}?itemPath=${itemPath}&destPath=${destPath}`, {
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
