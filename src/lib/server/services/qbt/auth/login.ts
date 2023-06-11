import { env } from '$env/dynamic/private';
import logger from '$lib/server/utils/logger';
import shared from '../shared';
import clientManager, { sessionRefreshMs } from './client-manager';

const headers = new Headers();
headers.append('Referer', shared.baseUrl);
headers.append('Origin', shared.baseUrl);
headers.append('Host', shared.baseUrl.split('://')[1]);
headers.append('Accept', '*/*');
headers.append('Content-Type', 'application/x-www-form-urlencoded');

export default async (clientId: string, skipCheck: boolean = false) => {
	const input = `${shared.baseUrl}/auth/login`;

	const now = Date.now();

	if (!skipCheck) {
		const client = await clientManager.get(clientId);
		if (client !== undefined && client.date > now + sessionRefreshMs) {
			return client;
		}
	}

	const username = encodeURIComponent(env.QBITTORRENT_USERNAME);
	const password = encodeURIComponent(env.QBITTORRENT_PASSWORD);
	const body = `username=${username}&password=${password}`;

	const response = await fetch(input, {
		method: 'POST',
		headers,
		body
	});

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const cookies = response.headers.get('set-cookie');

	if (!cookies) {
		throw new Error('No cookies returned during login');
	}

	const key = 'SID=';
	const sidIndex = cookies.indexOf(key);
	const semiColonIndex = cookies.indexOf(';', sidIndex);

	const sid = cookies.substring(sidIndex + key.length, sidIndex + semiColonIndex);

	logger.debug(`Client logged in`, clientId);

	return clientManager.set(clientId, sid);
};
