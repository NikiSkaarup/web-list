import shared from '../shared';

export default async (ruleName: string) => {
	const input = `${shared.baseUrl}/rss/removeRule`;
	const response = await fetch(`${input}?ruleName=${ruleName}`, {
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
