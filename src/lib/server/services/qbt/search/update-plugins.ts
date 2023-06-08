import shared from '../shared';

export default async () => {
	const input = `${shared.baseUrl}/search/updatePlugins`;
	const response = await fetch(`${input}`, {
		method: 'GET',
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
