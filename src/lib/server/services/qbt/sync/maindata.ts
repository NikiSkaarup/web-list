import clientManager from '../auth/client-manager';
import shared from '../shared';

export default async (rid: number = 0, client: QbtClient) => {
	const input = `${shared.baseUrl}/sync/maindata`;

	const response = await fetch(`${input}?rid=${rid}`, {
		method: 'GET',
		headers: {
			cookie: `SID=${client.sid}`
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	} else {
		clientManager.extendTimeout(client.clientId);
	}

	const data: QbtSyncMainData = await response.json();
	return data;
};
