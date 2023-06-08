import shared from '../shared';

export default async (filters: QbtLogMainParameters): Promise<Array<QbtLogItem>> => {
	const input = `${shared.baseUrl}/log/main`;
	let params = '';

	if (filters.last_known_id !== undefined) {
		params += params.length > 0 ? '&' : '?';
		params += `last_known_id=${filters.last_known_id}`;
	} else {
		params += params.length > 0 ? '&' : '?';
		params += `last_known_id=-1`;
	}

	if (filters.normal !== undefined) {
		params += `&normal=${filters.normal}`;
	}

	if (filters.warning !== undefined) {
		params += `&warning=${filters.warning}`;
	}

	if (filters.info !== undefined) {
		params += `&info=${filters.info}`;
	}

	if (filters.critical !== undefined) {
		params += `&critical=${filters.critical}`;
	}

	const response = await fetch(`${input}${params}`, {
		method: 'GET'
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: Array<QbtLogItem> = await response.json();
	return data;
};
