import logger from '$lib/server/utils/logger';
import shared from '../shared';

export default async (hash: QbtHash) => {
	const input = `${shared.baseUrl}/torrents/properties`;

	const response = await fetch(`${input}?hash=${hash}`, {
		method: 'GET',
		headers: {
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	try {
		const data: QbtTorrentsProperties = await response.json();
		return data;
	} catch (e) {
		logger.error('failed to get properties of torrent, torrent hash likely invalid', hash, e);
		throw new Error('torrent hash likely invalid');
	}
};
