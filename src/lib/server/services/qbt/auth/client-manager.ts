import { env } from '$env/dynamic/private';
import type login from './login';

const _timeout = parseInt(env.QBITTORRENT_SESSION_TIMEOUT);
export const sessionTimeout = !isNaN(_timeout) ? _timeout : 3600;
export const sessionTimeoutMs = sessionTimeout * 1000;
export const sessionRefresh = sessionTimeout / 10;
export const sessionRefreshMs = sessionTimeoutMs / 10;

// needs to automatically be deleted after sessionTimeout currently it is a memory leak or use a sqlite db (most likely)
const clients = new Map<string, QbtClient>();

const get = async (
	clientId: string | undefined | null,
	loginCallback: typeof login | undefined = undefined
): Promise<QbtClient | undefined> => {
	if (!clientId) return undefined;

	const client = clients.get(clientId);
	const now = Date.now();

	if (client !== undefined && client.date > now + sessionRefreshMs) {
		return client;
	}

	if (loginCallback) {
		return await loginCallback(clientId);
	}
	return undefined;
};

const set = (clientId: string, sid: string) => {
	const client = {
		sid,
		clientId,
		date: Date.now() + sessionTimeoutMs
	};
	clients.set(clientId, client);
	return client;
};

const extendTimeout = (clientId: string) => {
	const client = clients.get(clientId);

	if (client) {
		client.date = Date.now() + sessionTimeoutMs;
	}
};

export default {
	get,
	set,
	extendTimeout
};
