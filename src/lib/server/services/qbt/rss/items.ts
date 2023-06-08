import shared from '../shared';

export default async (withData?: boolean) => {
	const input = `${shared.baseUrl}/rss/items`;

	let params = '';

	if (withData !== undefined) {
		params += `?widthData=${withData}`;
	}

	const response = await fetch(`${input}${params}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: QbtRSSItems = await response.json();
	return data;
};
