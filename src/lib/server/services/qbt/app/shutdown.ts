import shared from '../shared';

export default async () => {
	const input = `${shared.baseUrl}/app/shutdown`;

	const response = await fetch(input, {
		method: 'GET'
	});

	return response.status;
};
