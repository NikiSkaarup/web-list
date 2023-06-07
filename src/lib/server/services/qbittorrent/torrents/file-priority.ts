export default async (
	hash: string,
	ids: string[],
	priority: QBittorrentPriority
): Promise<void> => {
	const files = ids.join('|');
	throw new Error('Not implemented');
};
