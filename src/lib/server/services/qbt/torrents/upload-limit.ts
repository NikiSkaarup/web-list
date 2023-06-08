import shared from '../shared';

export default {
	single: async (hashes: Array<QbtHash>) => {
		const input = `${shared.baseUrl}/torrents/uploadLimit`;
		const hashesToGetUploadLimit = hashes.join('|');
		const response = await fetch(`${input}?hashes=${hashesToGetUploadLimit}`, {
			method: 'GET',
			headers: {
				accept: 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data: QbtUploadLimitResponse = await response.json();
		return data;
	},
	all: async () => {
		const input = `${shared.baseUrl}/torrents/uploadLimit`;
		const response = await fetch(`${input}?hashes=all`, {
			method: 'GET',
			headers: {
				accept: 'application/json'
			}
		});

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data: QbtUploadLimitResponse = await response.json();
		return data;
	}
};
