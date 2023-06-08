export default {
	single: async (hashes: string[], deleteFiles: boolean): Promise<void> => {
		const hashesToDelete = hashes.join('|');
		throw new Error('Not implemented');
	},
	all: async (deleteFiles: boolean): Promise<void> => {
		// parameter "hashes" set to all
		throw new Error('Not implemented');
	}
};
