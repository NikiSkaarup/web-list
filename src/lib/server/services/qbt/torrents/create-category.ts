import shared from '../shared';

export default async (category: string, savePath: string) => {
	const input = `${shared.baseUrl}/torrents/createCategory`;
	const response = await fetch(`${input}?category=${category}&savePath=${savePath}`, {
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
