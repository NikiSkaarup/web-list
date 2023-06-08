import shared from '../shared';

export default async (hash: QbtHash, rid: number): Promise<unknown> => {
	// https://github.com/qbt/qBittorrent/wiki/WebUI-API-(qBittorrent-4.1)#get-torrent-peers-data
	// response is not documented
	const input = `${shared.baseUrl}/sync/torrentPeers`;

	const response = await fetch(`${input}?hash=${hash}&rid=${rid}`, {
		method: 'GET'
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: unknown = await response.text();
	return data;
};
