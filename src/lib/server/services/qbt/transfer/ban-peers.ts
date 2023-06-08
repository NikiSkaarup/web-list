export default async (peers: string[]): Promise<void> => {
	// peer === host:port / ip:port
	const peersToBan = peers.join('|');
	throw new Error('Not implemented');
};
