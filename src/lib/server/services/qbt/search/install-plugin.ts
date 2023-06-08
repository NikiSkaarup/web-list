import shared from '../shared';

export default async (sources: Array<string>) => {
	const input = `${shared.baseUrl}/search/installPlugin`;
	const sourcesToInstall = sources.join('|');
	const response = await fetch(`${input}?sources=${sourcesToInstall}`, {
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
