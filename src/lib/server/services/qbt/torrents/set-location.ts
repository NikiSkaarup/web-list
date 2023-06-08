export default {
	single: async (hashes: Array<string>, location: string): Promise<void> => {
		const hashesToSetLocation = hashes.join('|');
		throw new Error('Not implemented');
	},
	all: async (location: string): Promise<void> => {
		// parameter "hashes" set to all
		throw new Error('Not implemented');
	}
};
