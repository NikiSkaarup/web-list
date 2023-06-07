export default {
	single: async (hashes: string[], tags: string[]): Promise<void> => {
		const hashesToAddTags = hashes.join('|');
		throw new Error('Not implemented');
	},
	all: async (tags: string[]): Promise<void> => {
		// parameter "hashes" set to all
		throw new Error('Not implemented');
	}
};
