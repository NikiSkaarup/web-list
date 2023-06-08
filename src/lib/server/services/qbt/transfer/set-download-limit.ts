import shared from '../shared';

export default async (limit: number): Promise<void> => {
	const input = `${shared.baseUrl}/transfer/setDownloadLimit`;

	const response = await fetch(`${input}?limit=${limit}`, {
		method: 'POST'
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}
};
