export default {
	single: async (hashes: Array<string>, limit: number): Promise<void> => {
		const hashesToSetDownloadLimit = hashes.join('|');
		throw new Error('Not implemented');
	},
	all: async (limit: number): Promise<void> => {
		// parameter "hashes" set to all
		throw new Error('Not implemented');
	}
};
