import shared from '../shared';

export default async (rid: number = 0) => {
	const input = `${shared.baseUrl}/sync/maindata`;

	const response = await fetch(`${input}?rid=${rid}`, {
		method: 'GET'
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: QbtSyncMainData = await response.json();
	return data;
};
