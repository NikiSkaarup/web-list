import qbt from '$lib/server/services/qbt';

export const load = async (event) => {
	await qbt.auth.login(event.locals.clientId);

	const result = await event.fetch('/api/qbt/v2/maindata/0', {
		method: 'get',
		headers: {
			cookie: `web-list-client-id=${event.locals.clientId}`
		}
	});
	const maindata: QbtSyncMainData = await result.json();

	return {
		maindata
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

		// swap to use the web api implementation
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
