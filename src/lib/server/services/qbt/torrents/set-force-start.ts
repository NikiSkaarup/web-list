export default {
	single: async (hashes: Array<string>, value: boolean): Promise<void> => {
		const hashesToSetForceStart = hashes.join('|');
		throw new Error('Not implemented');
	},
	all: async (value: boolean): Promise<void> => {
		// parameter "hashes" set to all
		throw new Error('Not implemented');
	}
};
