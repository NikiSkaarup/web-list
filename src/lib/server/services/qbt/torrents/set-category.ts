export default {
	single: async (hashes: Array<string>, category: string): Promise<void> => {
		const hashesToSetCategory = hashes.join('|');
		throw new Error('Not implemented');
	},
	all: async (category: string): Promise<void> => {
		// parameter "hashes" set to all
		throw new Error('Not implemented');
	}
};
