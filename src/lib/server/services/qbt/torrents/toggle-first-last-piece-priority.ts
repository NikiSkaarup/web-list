import shared from '../shared';

export default {
	single: async (hashes: Array<QbtHash>) => {
		const input = `${shared.baseUrl}/torrents/toggleFirstLastPiecePrio`;
		const hashesToToggleFirstLastPiecePriority = hashes.join('|');
		const response = await fetch(`${input}?hashes=${hashesToToggleFirstLastPiecePriority}`, {
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
	all: async () => {
		const input = `${shared.baseUrl}/torrents/toggleFirstLastPiecePrio`;
		const response = await fetch(`${input}?hashes=all`, {
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
