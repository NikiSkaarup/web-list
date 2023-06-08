import shared from '../shared';

export default async (hashes: Array<QbtHash>, peers: Array<string>): Promise<void> => {
	const input = `${shared.baseUrl}/transfer/addPeers`;
	// peer === host:port / ip:port
	const hashesToAddPeersTo = peers.join('|');
	const peersToAdd = peers.join('|');

	const response = await fetch(
		`${input}?hashes=${hashesToAddPeersTo}&peers=${encodeURIComponent(peersToAdd)}`,
		{
			method: 'POST'
		}
	);

	if (!response.ok) {
		throw new Error(response.statusText);
	}
};
