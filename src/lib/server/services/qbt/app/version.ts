import shared from '../shared';

export default async () => {
	const input = `${shared.baseUrl}/app/version`;

	const response = await fetch(input, {
		method: 'GET'
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}
	const data = await response.text();
	return data;
};
