import { env } from '$env/dynamic/private';
import type login from './login';

const _timeout = parseInt(env.QBITTORRENT_SESSION_TIMEOUT);
const sessionTimeout = !isNaN(_timeout) ? _timeout : 3600;
const sessionRefresh = sessionTimeout / 10;

// needs to automatically be deleted after sessionTimeout currently it is a memory leak
const clients = new Map<string, QbtClient>();

export default {
	get: async (
		clientId: string | undefined | null,
		loginCallback: typeof login | undefined = undefined
	): Promise<QbtClient | undefined> => {
		if (!clientId) return undefined;

		let client = clients.get(clientId);

		if (client !== undefined && client.date - sessionRefresh < Date.now()) {
			return client;
		}

		if (loginCallback) {
			return await loginCallback(clientId);
		} else {
			return undefined;
		}
	},
	set: (clientId: string, sid: string) => {
		const client = {
			sid,
			clientId,
			date: Date.now()
		};
		clients.set(clientId, client);
		return client;
	},
	extendTimeout: (clientId: string) => {
		const client = clients.get(clientId);

		if (client) {
			client.date = Date.now() + sessionTimeout;
		}
	}
};
