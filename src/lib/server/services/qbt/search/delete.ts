import shared from '../shared';

export default async (id: number) => {
	const input = `${shared.baseUrl}/search/delete`;
	const response = await fetch(`${input}?id=${id}`, {
		method: 'POST',
		headers: {
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data = await response.text();
	return data;
};
