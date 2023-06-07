import shared from '../shared';

export default async (filters: QBittorrentTorrentsInfoParameters) => {
	// throw new Error('Not implemented');
	const input = `${shared.baseUrl}/torrents/info`;

	const response = await fetch(input, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}
	const data: QbittorrentTorrent[] = await response.json();
	return data;
};
