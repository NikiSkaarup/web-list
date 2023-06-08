import shared from '../shared';

export default {
	single: async (hashes: Array<QbtHash>, value: boolean) => {
		const input = `${shared.baseUrl}/torrents/setSuperSeeding`;
		const hashesToSetSuperSeeding = hashes.join('|');
		const response = await fetch(`${input}?hashes=${hashesToSetSuperSeeding}&value=${value}`, {
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
	all: async (value: boolean) => {
		const input = `${shared.baseUrl}/torrents/setSuperSeeding`;
		const response = await fetch(`${input}?hashes=all&value=${value}`, {
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
