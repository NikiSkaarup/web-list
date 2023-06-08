import shared from '../shared';

export default async (peers: string[]): Promise<void> => {
	const input = `${shared.baseUrl}/transfer/setUploadLimit`;
	// peer === host:port / ip:port
	const peersToBan = peers.join('|');

	const response = await fetch(`${input}?peers=${encodeURIComponent(peersToBan)}`, {
		method: 'POST'
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}
};
