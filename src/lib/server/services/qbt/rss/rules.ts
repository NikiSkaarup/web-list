import shared from '../shared';

export default async () => {
	const input = `${shared.baseUrl}/rss/rules`;

	const response = await fetch(`${input}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: QbtRSSRules = await response.json();
	return data;
};
