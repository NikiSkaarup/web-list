import { env } from '$env/dynamic/private';

const baseUrl = `${env.QBITTORRENT_URL}/api/v2`;

export default {
	baseUrl
};
