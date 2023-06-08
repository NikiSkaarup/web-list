import { getCategoryNames } from '$lib/server/categories';
import type { selectItemSchema } from '$lib/server/database/schema';

export const load = async (event) => {
	const { imdb } = event.params;
	const categories = await getCategoryNames();

	const searchCategories = event.url.searchParams
		.getAll('categories')
		.filter((c) => categories.includes(c));
	let by = event.url.searchParams.get('by') ?? 'dt';
	const asc = event.url.searchParams.get('asc') === 'true';
	const limit = Number(event.url.searchParams.get('limit'));
	const offset = Number(event.url.searchParams.get('offset'));

	const input =
		'/api/items' +
		event.url.search +
		(event.url.search.length > 0 ? '&' : '?') +
		'imdb=' +
		imdb;

	const response = await event.fetch(input);
	const result: { items: Array<typeof selectItemSchema._type>; total: number } =
		await response.json();

	if (!['dt', 'title', 'size', 'cat', 'imdb', 'ext_id'].includes(by)) {
		by = 'dt';
	}

	return {
		imdb,
		items: result.items,
		total: result.total,
		categories: categories.map((cat) => ({
			name: cat,
			checked: searchCategories.includes(cat)
		})),
		by: by as sortBy,
		asc,
		limit: isNaN(limit) ? 10 : limit > 0 ? limit : 10,
		offset: isNaN(offset) ? 0 : offset
	};
};
