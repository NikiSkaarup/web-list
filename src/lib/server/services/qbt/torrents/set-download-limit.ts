import shared from '../shared';

export default {
	single: async (hashes: Array<QbtHash>, limit: number) => {
		const input = `${shared.baseUrl}/torrents/setDownloadLimit`;
		const hashesToSetDownloadLimit = hashes.join('|');
		const response = await fetch(`${input}?hashes=${hashesToSetDownloadLimit}&limit=${limit}`, {
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
	},
	all: async (limit: number) => {
		const input = `${shared.baseUrl}/torrents/setDownloadLimit`;
		const response = await fetch(`${input}?hashes=all&limit=${limit}`, {
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
	}
};
