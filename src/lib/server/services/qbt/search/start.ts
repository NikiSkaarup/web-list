export default async (
	pattern: string,
	plugins: Array<string> | string,
	category: string
): Promise<void> => {
	if (typeof plugins === 'string') plugins = [plugins];
	const pluginsToStart = plugins.join('|');
	throw new Error('Not implemented');
};
