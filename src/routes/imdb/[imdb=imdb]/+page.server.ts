import { getCategoryNames } from '$lib/server/categories';
import type { selectItemSchema } from '$lib/server/db/schema';

let categories: string[] = [];

export const load = async (event) => {
	const { imdb } = event.params;

	if (categories.length === 0) categories = await getCategoryNames();

	const response = await event.fetch('/api/items?order=dt&asc=false&size=10&page=0&imdb=' + imdb);
	const result: { items: (typeof selectItemSchema._type)[]; total: number } =
		await response.json();

	return {
		imdb,
		items: result.items,
		total: result.total,
		categories
	};
};
