import { getCategoryNames } from '$lib/server/categories';
import type { selectItemSchema } from '$lib/server/database/schema';

export const load = async (event) => {
	const categories = await getCategoryNames();

	const searchCats = event.url.searchParams.getAll('categories');
	let by = event.url.searchParams.get('by') ?? 'dt';
	const asc = event.url.searchParams.get('asc') === 'true';
	const limit = Number(event.url.searchParams.get('limit'));
	const offset = Number(event.url.searchParams.get('offset'));
	const searchText = event.url.searchParams.get('search-text');
	const groupBy = event.url.searchParams.get('group-by');

	const response = await event.fetch('/api/items' + event.url.search);
	const result: { items: (typeof selectItemSchema._type)[]; total: number } =
		await response.json();

	if (!['dt', 'title', 'size', 'cat', 'imdb', 'ext_id'].includes(by)) {
		by = 'dt';
	}

	const searchCategories =
		searchCats.length > categories.length
			? []
			: categories.map((cat) => ({
					name: cat,
					checked: searchCats.includes(cat)
			  }));

	return {
		items: result.items,
		total: result.total,
		categories: searchCategories,
		by: by as sortBy,
		asc,
		limit: isNaN(limit) ? 10 : limit > 0 ? limit : 10,
		offset: isNaN(offset) ? 0 : offset,
		searchText,
		groupBy
	};
};
