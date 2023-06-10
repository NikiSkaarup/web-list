import qbt from '$lib/server/services/qbt';
import clientManager from '$lib/server/services/qbt/auth/client-manager.js';
import { json } from '@sveltejs/kit';

export const GET = async (event) => {
	const rid = Number(event.params.rid ?? 0);
	if (isNaN(rid)) throw new Error('Invalid rid');

	performance.mark('qbt-sync-maindata-start');
	const client = await clientManager.get(event.locals.clientId, qbt.auth.login);

	if (!client) throw new Error('Invalid client');

	performance.mark('qbt-sync-maindata-end');
	const res = performance.measure(
		'qbt-sync-maindata',
		'qbt-sync-maindata-start',
		'qbt-sync-maindata-end'
	);

	console.log(res);

	const result = await qbt.sync.maindata(rid, client);

	return json(result);
};
