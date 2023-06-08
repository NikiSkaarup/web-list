export default {
	single: async (hashes: Array<QbtHash>, enable: boolean): Promise<void> => {
		const hashesToSetAutoManagement = hashes.join('|');
		throw new Error('Not implemented');
	},
	all: async (enable: boolean): Promise<void> => {
		// parameter "hashes" set to all
		throw new Error('Not implemented');
	}
};
