import shared from '../shared';

export default {
	single: async (hashes: Array<QbtHash>) => {
		const input = `${shared.baseUrl}/torrents/bottomPrio`;
		const hashesToBottomPriority = hashes.join('|');
		const response = await fetch(`${input}?hashes=${hashesToBottomPriority}`, {
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
	},
	all: async () => {
		const input = `${shared.baseUrl}/torrents/bottomPrio`;
		const response = await fetch(`${input}?hashes=all`, {
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
	}
};
