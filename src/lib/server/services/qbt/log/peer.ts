import shared from '../shared';

export default async (lastKnownId: number = -1) => {
	const input = `${shared.baseUrl}/log/peer`;

	const response = await fetch(`${input}?last_known_id=${lastKnownId}`, {
		method: 'GET'
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: Array<QbtPeerLogItem> = await response.json();
	return data;
};
