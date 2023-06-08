import shared from '../shared';

export default async (): Promise<QbtTransferInfo> => {
	const input = `${shared.baseUrl}/transfer/info`;

	const response = await fetch(input, {
		method: 'GET'
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: QbtTransferInfo = await response.json();
	return data;
};
