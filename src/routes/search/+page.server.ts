import { getCategoryNames } from '$lib/server/categories';
import type { selectItemSchema } from '$lib/server/db/schema';

let categories: string[] = [];

export const load = async (event) => {
	if (categories.length === 0) categories = await getCategoryNames();

	const response = await event.fetch('/api/items' + event.url.search);
	const result: { items: (typeof selectItemSchema._type)[]; total: number } =
		await response.json();

	return {
		items: result.items,
		total: result.total,
		categories
	};
};
