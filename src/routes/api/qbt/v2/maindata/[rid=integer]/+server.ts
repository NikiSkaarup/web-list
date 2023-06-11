import qbt from '$lib/server/services/qbt';
import clientManager from '$lib/server/services/qbt/auth/client-manager.js';
import { json } from '@sveltejs/kit';

export const GET = async (event) => {
	const rid = Number(event.params.rid ?? 0);
	if (isNaN(rid)) throw new Error('Invalid rid');

	const client = await clientManager.get(event.locals.clientId, qbt.auth.login);

	if (!client) throw new Error('Invalid client');

	const result = await qbt.sync.maindata(rid, client);

	return json(result);
};
