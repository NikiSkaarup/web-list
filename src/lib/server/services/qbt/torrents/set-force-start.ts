import shared from '../shared';

export default {
	single: async (hashes: Array<QbtHash>, value: boolean) => {
		const input = `${shared.baseUrl}/torrents/setForceStart`;
		const hashesToSetForceStart = hashes.join('|');
		const response = await fetch(`${input}?hashes=${hashesToSetForceStart}&value=${value}`, {
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
		const input = `${shared.baseUrl}/torrents/setForceStart`;
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
