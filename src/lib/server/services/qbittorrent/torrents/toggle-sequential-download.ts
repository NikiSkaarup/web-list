export default {
	single: async (hashes: string[]): Promise<void> => {
		const hashesToToggleSequentialDownload = hashes.join('|');
		throw new Error('Not implemented');
	},
	all: async (): Promise<void> => {
		// parameter "hashes" set to all
		throw new Error('Not implemented');
	}
};