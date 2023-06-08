import shared from '../shared';

export default async (
	pattern: string,
	plugins: Array<string> | 'all' | 'enabled',
	category: string | 'all'
) => {
	const input = `${shared.baseUrl}/search/start`;
	if (typeof plugins === 'string') plugins = [plugins];
	const pluginsToStart = plugins.join('|');
	const response = await fetch(
		`${input}?pattern=${pattern}&pluginsToStart=${pluginsToStart}&category=${category}`,
		{
			method: 'POST',
			headers: {
				accept: 'application/json'
			}
		}
	);

	if (!response.ok) {
		throw new Error(response.statusText);
	}

	const data: QbtSearchStartResponse = await response.json();
	return data;
};
