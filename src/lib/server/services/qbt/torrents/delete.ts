import shared from '../shared';

export default {
	single: async (hashes: string[], deleteFiles: boolean) => {
		const input = `${shared.baseUrl}/torrents/delete`;
		const hashesToDelete = hashes.join('|');
		const response = await fetch(
			`${input}?hashes=${hashesToDelete}&deleteFiles=${deleteFiles}`,
			{
				method: 'GET',
				headers: {
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
	all: async (deleteFiles: boolean) => {
		const input = `${shared.baseUrl}/torrents/resume`;
		const response = await fetch(`${input}?hashes=all&deleteFiles=${deleteFiles}`, {
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
