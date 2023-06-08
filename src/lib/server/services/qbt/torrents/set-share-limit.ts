import shared from '../shared';

export default {
	single: async (hashes: Array<QbtHash>, ratioLimit: number, seedingTimeLimit: number) => {
		const input = `${shared.baseUrl}/torrents/setShareLimits`;
		const hashesToSetShareLimit = hashes.join('|');
		const response = await fetch(
			`${input}?hashes=${hashesToSetShareLimit}&ratioLimit=${ratioLimit}&seedingTimeLimit=${seedingTimeLimit}`,
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
	all: async (ratioLimit: number, seedingTimeLimit: number) => {
		const input = `${shared.baseUrl}/torrents/setShareLimits`;
		const response = await fetch(
			`${input}?hashes=all&ratioLimit=${ratioLimit}&seedingTimeLimit=${seedingTimeLimit}`,
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
	}
};
