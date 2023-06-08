export default {
	single: async (
		hashes: string[],
		ratioLimit: number,
		seedingTimeLimit: number
	): Promise<void> => {
		const hashesToSetShareLimit = hashes.join('|');
		throw new Error('Not implemented');
	},
	all: async (ratioLimit: number, seedingTimeLimit: number): Promise<void> => {
		// parameter "hashes" set to all
		throw new Error('Not implemented');
	}
};
