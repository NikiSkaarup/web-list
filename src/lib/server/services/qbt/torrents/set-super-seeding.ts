export default {
	single: async (hashes: Array<QbtHash>, value: boolean): Promise<void> => {
		const hashesToSetSuperSeeding = hashes.join('|');
		throw new Error('Not implemented');
	},
	all: async (value: boolean): Promise<void> => {
		// parameter "hashes" set to all
		throw new Error('Not implemented');
	}
};
