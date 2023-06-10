import shared from '../shared';

export default async (filters: QbtTorrentsInfoParameters = {}) => {
	const input = `${shared.baseUrl}/torrents/info`;

	const params = new URLSearchParams();

	if (filters.filter !== undefined) params.append('filter', filters.filter);
	if (filters.category !== undefined)
		params.append('category', encodeURIComponent(filters.category));
	if (filters.tag !== undefined) params.append('tag', encodeURIComponent(filters.tag));
	if (filters.sort !== undefined) params.append('sort', filters.sort);
	if (filters.reverse !== undefined) params.append('reverse', filters.reverse.toString());
	if (filters.limit !== undefined) params.append('limit', filters.limit.toString());
	if (filters.offset !== undefined) params.append('offset', filters.offset.toString());
	if (filters.hashes !== undefined) params.append('hash', filters.hashes.join('|'));

	const response = await fetch(input, {
		method: 'GET',
		headers: {
			accept: 'application/json'
		}
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: Array<QbtTorrent> = await response.json();
	return data;
};
