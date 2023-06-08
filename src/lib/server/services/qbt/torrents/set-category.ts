import shared from '../shared';

export default {
	single: async (hashes: Array<QbtHash>, category: string) => {
		const input = `${shared.baseUrl}/torrents/setCategory`;
		const hashesToSetCategory = hashes.join('|');
		const response = await fetch(
			`${input}?hashes=${hashesToSetCategory}&category=${category}`,
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
	all: async (category: string) => {
		const input = `${shared.baseUrl}/torrents/setCategory`;
		const response = await fetch(`${input}?hashes=all&category=${category}`, {
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
