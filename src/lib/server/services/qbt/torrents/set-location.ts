import shared from '../shared';

export default {
	single: async (hashes: Array<QbtHash>, location: string) => {
		const input = `${shared.baseUrl}/torrents/setLocation`;
		const hashesToSetLocation = hashes.join('|');
		const response = await fetch(
			`${input}?hashes=${hashesToSetLocation}&location=${location}`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded',
					accept: 'application/json'
				}
			}
		);

		if (!response.ok) {
			throw new Error(response.statusText);
		}

		const data = await response.text();
		return data;
	},
	all: async (location: string) => {
		const input = `${shared.baseUrl}/torrents/setLocation`;
		const response = await fetch(`${input}?hashes=all&location=${location}`, {
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
