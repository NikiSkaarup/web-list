import shared from '../shared';

export default async (tags: QbtTorrentsTags) => {
	const input = `${shared.baseUrl}/torrents/createTags`;
	const tagsToDelete = tags.join(',');
	const response = await fetch(`${input}?tags=${tagsToDelete}`, {
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
};
