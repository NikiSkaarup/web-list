import shared from '../shared';

export default async () => {
	const input = `${shared.baseUrl}/search/plugins`;
	const response = await fetch(`${input}`, {
		method: 'GET',
		headers: {
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: QbtSearchPlugins = await response.json();
	return data;
};
