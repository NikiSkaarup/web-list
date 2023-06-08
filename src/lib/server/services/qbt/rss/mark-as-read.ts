import shared from '../shared';

export default async (itemPath: string, articleId?: string) => {
	const input = `${shared.baseUrl}/rss/markAsRead`;

	let params = `itemPath=${itemPath}`;

	if (articleId) {
		params += `&articleId=${articleId}`;
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
