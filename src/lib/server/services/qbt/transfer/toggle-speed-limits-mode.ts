import shared from '../shared';

export default async (enabled: boolean) => {
	const input = `${shared.baseUrl}/transfer/toggleSpeedLimitsMode`;

	const response = await fetch(input, {
		method: 'GET'
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	return !enabled;
};
