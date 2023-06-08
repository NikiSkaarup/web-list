import shared from '../shared';

export default {
	single: async (hashes: Array<QbtHash>, enable: boolean) => {
		const input = `${shared.baseUrl}/torrents/setAutoManagement`;
		const hashesToSetAutoManagement = hashes.join('|');
		const response = await fetch(
			`${input}?hashes=${hashesToSetAutoManagement}&enable=${enable}`,
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
	all: async (enable: boolean) => {
		const input = `${shared.baseUrl}/torrents/setAutoManagement`;
		const response = await fetch(`${input}?hashes=all&enable=${enable}`, {
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
