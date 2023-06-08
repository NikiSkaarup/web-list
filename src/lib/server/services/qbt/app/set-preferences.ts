import shared from '../shared';

export default async (preferences: QbtPreferences) => {
	const input = `${shared.baseUrl}/app/setPreferences`;
	const params = `json=${encodeURIComponent(JSON.stringify(preferences))}`;

	const response = await fetch(`${input}?${params}`, {
		method: 'POST'
	});

	return response.status;
};
