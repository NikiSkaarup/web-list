import shared from '../shared';

const addTorrent = async (params: QBittorrentTorrentsAddParams) => {
	const body = new FormData();
	body.append('urls', params.urls);
	// body.append('savepath', savePath);
	// body.append('cookie', cookie);
	// body.append('category', category);
	// body.append('skip_checking', skip_checking.toString());
	body.append('paused', params.paused ?? 'false');
	// body.append('root_folder', root_folder.toString());

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
		console.log('error', error);
		return {
			error: {
				message: error.toString()
			}
		};
	}
};

export default addTorrent;
