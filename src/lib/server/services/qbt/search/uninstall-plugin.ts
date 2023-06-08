import shared from '../shared';

export default async (names: Array<string>) => {
	const input = `${shared.baseUrl}/search/uninstallPlugin`;
	const namesToUninstall = names.join('|');
	const response = await fetch(`${input}?names=${namesToUninstall}`, {
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
