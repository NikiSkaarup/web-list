import shared from '../shared';

export default async (hash: QbtHash, ids: Array<string>, priority: QbtPriority) => {
	const input = `${shared.baseUrl}/torrents/filePrio`;
	const fileIds = ids.join('|');
	const response = await fetch(`${input}?hash=${hash}&id=${fileIds}&priority=${priority}`, {
		method: 'GET',
		headers: {
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data = await response.text();
	return data;
};
