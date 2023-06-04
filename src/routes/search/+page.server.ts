import { getCategoryNames } from '$lib/server/categories';
import type { selectItemSchema } from '$lib/server/db/schema';

let categories: string[] = [];

export const load = async (event) => {
	if (categories.length === 0) categories = await getCategoryNames();

	const searchCategories = event.url.searchParams
		.getAll('categories')
		.filter((c) => categories.includes(c));
	let by = event.url.searchParams.get('by') ?? 'dt';
	const asc = event.url.searchParams.get('asc') === 'true';
	const limit = Number(event.url.searchParams.get('limit'));
	const offset = Number(event.url.searchParams.get('offset'));
	const title = event.url.searchParams.get('title');
	const groupBy = event.url.searchParams.get('group-by');

	const response = await event.fetch('/api/items' + event.url.search);
	const result: { items: (typeof selectItemSchema._type)[]; total: number } =
		await response.json();

	if (!['dt', 'title', 'size', 'cat', 'imdb', 'ext_id'].includes(by)) {
		by = 'dt';
	}

	return {
		items: result.items,
		total: result.total,
		categories: categories.map((cat) => ({
			name: cat,
			checked: searchCategories.includes(cat)
		})),
		by: by as sortBy,
		asc,
		limit: isNaN(limit) ? 10 : limit > 0 ? limit : 10,
		offset: isNaN(offset) ? 0 : offset,
		title,
		groupBy
	};
};
