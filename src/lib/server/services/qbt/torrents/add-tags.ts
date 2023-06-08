export default {
	single: async (hashes: Array<string>, tags: Array<string>): Promise<void> => {
		const hashesToAddTags = hashes.join('|');
		throw new Error('Not implemented');
	},
	all: async (tags: Array<string>): Promise<void> => {
		// parameter "hashes" set to all
		throw new Error('Not implemented');
	}
};
