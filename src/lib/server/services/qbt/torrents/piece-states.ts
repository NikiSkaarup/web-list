import shared from '../shared';

export default async (hash: string) => {
	const input = `${shared.baseUrl}/torrents/pieceStates`;

	const response = await fetch(`${input}?hash=${hash}`, {
		method: 'GET',
		headers: {
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: QbtTorrentsPieceStates[] = await response.json();
	return data;
};
