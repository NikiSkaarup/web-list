import shared from '../shared';

export default {
	single: async (hashes: Array<QbtHash>) => {
		const input = `${shared.baseUrl}/torrents/increasePrio`;
		const hashesToIncreasePriority = hashes.join('|');
		const response = await fetch(`${input}?hashes=${hashesToIncreasePriority}`, {
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
		const input = `${shared.baseUrl}/torrents/increasePrio`;
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
