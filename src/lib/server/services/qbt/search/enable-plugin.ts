import shared from '../shared';

export default async (names: Array<string>, enable: boolean) => {
	const input = `${shared.baseUrl}/search/enablePlugin`;
	const namesToEnable = names.join('|');
	const response = await fetch(`${input}?names=${namesToEnable}&enable=${enable}`, {
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
