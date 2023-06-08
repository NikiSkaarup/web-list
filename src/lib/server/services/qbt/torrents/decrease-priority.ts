export default {
	single: async (hashes: Array<string>): Promise<void> => {
		const hashesToDecreasePriority = hashes.join('|');
		throw new Error('Not implemented');
	},
	all: async (): Promise<void> => {
		// parameter "hashes" set to all
		throw new Error('Not implemented');
	}
};
