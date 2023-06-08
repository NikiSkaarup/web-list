import shared from '../shared';

export default async (hash: QbtHash, oldPath: string, newPath: string) => {
	const input = `${shared.baseUrl}/torrents/renameFolder`;
	const response = await fetch(`${input}?hash=${hash}&oldPath=${oldPath}&newPath=${newPath}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data = await response.text();
	return data;
};
