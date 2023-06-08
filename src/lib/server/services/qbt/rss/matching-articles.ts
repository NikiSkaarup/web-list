import shared from '../shared';

export default async (ruleName: string) => {
	const input = `${shared.baseUrl}/rss/matchingArticles`;
	const response = await fetch(`${input}?ruleName=${ruleName}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: QbtRSSMatchingArticles = await response.json();
	return data;
};
