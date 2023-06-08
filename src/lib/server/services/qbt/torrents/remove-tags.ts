import shared from '../shared';

export default {
	single: async (hashes: Array<QbtHash>, tags: QbtTorrentsTags) => {
		const input = `${shared.baseUrl}/torrents/removeTags`;
		const hashesToRemoveTags = hashes.join('|');
		const tagsToRemove = tags.join(',');
		const response = await fetch(`${input}?hashes=${hashesToRemoveTags}&tags=${tagsToRemove}`, {
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
	all: async (tags: QbtTorrentsTags) => {
		const input = `${shared.baseUrl}/torrents/removeTags`;
		const tagsToRemove = tags.join(',');
		const response = await fetch(`${input}?hashes=all&tags=${tagsToRemove}`, {
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
