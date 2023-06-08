import shared from '../shared';

export default async (filters: QbtTorrentsInfoParameters) => {
	const input = `${shared.baseUrl}/torrents/info`;

	const response = await fetch(input, {
		method: 'GET',
		headers: {
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}
	const data: QbtTorrent[] = await response.json();
	return data;
};
