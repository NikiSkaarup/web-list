import shared from '../shared';

export default {
	single: async (hashes: string[]) => {
		const input = `${shared.baseUrl}/torrents/recheck`;
		const hashesToRecheck = hashes.join('|');
		const response = await fetch(`${input}?hashes=${hashesToRecheck}`, {
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
		const input = `${shared.baseUrl}/torrents/recheck`;
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
