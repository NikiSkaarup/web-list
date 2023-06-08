import shared from '../shared';

export default async (id: number, limit?: number, offset?: number) => {
	const input = `${shared.baseUrl}/search/results`;

	let params = `?id=${id}`;

	if (limit !== undefined) {
		params += `&limit=${limit}`;
	}

	if (offset !== undefined) {
		params += `&offset=${offset}`;
	}

	const response = await fetch(`${input}${params}`, {
		method: 'GET',
		headers: {
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: QbtSearchResult = await response.json();
	return data;
};
