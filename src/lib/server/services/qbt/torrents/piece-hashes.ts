import shared from '../shared';

export default async (hash: QbtHash) => {
	const input = `${shared.baseUrl}/torrents/pieceHashes`;

	const response = await fetch(`${input}?hash=${hash}`, {
		method: 'GET',
		headers: {
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: Array<QbtTorrentsPieceHashes> = await response.json();
	return data;
};
