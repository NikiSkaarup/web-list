import shared from '../shared';

export default async () => {
	const input = `${shared.baseUrl}/app/buildInfo`;

	const response = await fetch(input, {
		method: 'GET'
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: QbtBuildInfo = await response.json();
	return data;
};
