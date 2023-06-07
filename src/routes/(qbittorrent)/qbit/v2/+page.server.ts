const stringify = (obj: unknown) => {
	if (typeof obj === 'string') return obj;
	return JSON.stringify(obj, null, 2);
};

const qBitV2 = async (slug: string, json: boolean = true) => {
	try {
		const response = await fetch(`http://localhost:8080/api/v2/${slug}`);
		if (!response.ok) {
			return stringify({ error: { status: response.status } });
		}
		if (!json) return await response.text();

		try {
			const data = await response.json();
			return JSON.stringify(data, null, 2);
		} catch (error: any) {
			return stringify({
				error: { message: error.toString(), resp: stringify(await response.text()) }
			});
		}
	} catch (error: any) {
		return stringify({ error: { message: error.toString() } });
	}
};

let rid = 0;

export const load = (event) => {
	return {
		app: qBitV2(`app/version`, false),
		webApiVersion: qBitV2(`app/webapiVersion`, false)
		// buildInfo: qBitV2(`app/buildInfo`),
		//maindata: qBitV2(`sync/maindata?rid=${rid}`),
		// torrents: qBitV2(`torrents/info`),
		// torrentPeers: qBitV2(`sync/torrentPeers?hash=asdefg&rid=${rid}`),
		// preferences: qBitV2(`app/preferences`)
	};
};

export const actions = {
	default: async (event) => {
		const formData = await event.request.formData();

		const urls = formData.get('urls')?.toString() ?? '';
		const savePath = formData.get('savepath')?.toString() ?? '';
		const cookie = formData.get('cookie')?.toString() ?? '';
		const category = formData.get('category')?.toString() ?? '';
		const skip_checking = formData.get('skip_checking') === 'on';
		const paused = formData.get('paused') === 'on';
		const root_folder = formData.get('root_folder') === 'on';

		const body = new FormData();
		body.append('urls', urls);
		body.append('savepath', savePath);
		body.append('cookie', cookie);
		body.append('category', category);
		body.append('skip_checking', skip_checking.toString());
		body.append('paused', paused.toString());
		body.append('root_folder', root_folder.toString());

		try {
			const response = await fetch(`http://localhost:8080/api/v2/torrents/add`, {
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
	}
};
