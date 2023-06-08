import shared from '../shared';

export default async (categories: Array<string>) => {
	const input = `${shared.baseUrl}/torrents/removeCategories`;
	const categoriesToRemove = categories.join('%0A'); // %0A is \n
	const response = await fetch(`${input}?categories=${categoriesToRemove}`, {
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
