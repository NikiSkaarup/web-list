import shared from '../shared';

export default {
	single: async (hashes: Array<QbtHash>) => {
		const input = `${shared.baseUrl}/torrents/downloadLimit`;
		const hashesToGetDownloadLimit = hashes.join('|');
		const response = await fetch(`${input}?hashes=${hashesToGetDownloadLimit}`, {
			method: 'GET',
			headers: {
				accept: 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data: QbtDownloadLimitResponse = await response.json();
		return data;
	},
	all: async () => {
		const input = `${shared.baseUrl}/torrents/downloadLimit`;
		const response = await fetch(`${input}?hashes=all`, {
			method: 'GET',
			headers: {
				accept: 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data: QbtDownloadLimitResponse = await response.json();
		return data;
	}
};
