import logger from '$lib/server/utils/logger';
import shared from '../shared';

const append = (
	body: FormData,
	key: string,
	value:
		| string
		| number
		| bigint
		| boolean
		| Blob
		| undefined
		| null
		| Array<string>
		| Array<number>,
	splitter: string = '|'
) => {
	if (value === undefined || value === null) return;

	if (Array.isArray(value)) {
		body.append(key, value.join(splitter));
		return;
	}

	switch (typeof value) {
		case 'string':
			if (value.length > 0) {
				body.append(key, value);
			}
			break;
		case 'number':
		case 'boolean':
		case 'bigint':
			body.append(key, value.toString());
			break;
		case 'object':
			body.append(key, value);
			break;
	}
};

const addTorrent = async (params: QbtTorrentsAddParams) => {
	const body = new FormData();

	append(body, 'urls', params.urls);
	append(body, 'torrents', params.torrents);
	append(body, 'savepath', params.savepath);
	append(body, 'cookie', params.cookie);
	append(body, 'category', params.category);
	append(body, 'tags', params.tags, ',');
	append(body, 'skip_checking', params.skip_checking);
	append(body, 'paused', params.paused);
	append(body, 'root_folder', params.root_folder);
	append(body, 'rename', params.rename);
	append(body, 'upLimit', params.upLimit);
	append(body, 'dlLimit', params.dlLimit);
	append(body, 'ratioLimit', params.ratioLimit);
	append(body, 'seedingTimeLimit', params.seedingTimeLimit);
	append(body, 'autoTMM', params.autoTMM);
	append(body, 'sequentialDownload', params.sequentialDownload);
	append(body, 'firstLastPiecePrio', params.firstLastPiecePrio);

	const input = `${shared}/torrents/add`;

	try {
		const response = await fetch(input, {
			method: 'POST',
			body
		});

		if (!response.ok) {
			const text = await response.text();
			return {
				error: {
					status: response.status,
					text
				}
			};
		}

		const data = await response.text();

		return {
			response: data
		};
	} catch (error: any) {
		logger.error('failed to add torrent', error);

		return {
			error: {
				message: error.toString()
			}
		};
	}
};

export default addTorrent;
