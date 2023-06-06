import { getCategoryNames } from '$lib/server/categories';
import database from '$lib/server/database';
import { items } from '$lib/server/database/schema';
import { json } from '@sveltejs/kit';
import { sql, asc, desc, eq, inArray, like } from 'drizzle-orm';

const imdbMatcher = /^tt[0-9]{7,9}$/;

const getOrderBy = (order: string, ascParam: boolean) => {
	switch (order) {
		case 'title':
			return ascParam ? asc(items.title) : desc(items.title);
		case 'size':
			return ascParam ? asc(items.size) : desc(items.size);
		case 'cat':
			return ascParam ? asc(items.cat) : desc(items.cat);
		case 'imdb':
			return ascParam ? asc(items.imdb) : desc(items.imdb);
		case 'extId':
			return ascParam ? asc(items.ext_id) : desc(items.ext_id);
		case 'dt':
		default:
			return ascParam ? asc(items.dt) : desc(items.dt);
	}
};

const getTotal = async (
	categories: string[],
	searchText: string | null,
	groupBy: 'imdb' | 'extId' | '' | null,
	imdb: string | null
) => {
	let query = database.db.select({ count: sql<number>`count(*)` }).from(items);

	if (groupBy === 'extId') {
		// query = query.groupBy(items.ext_id);
	} else if (groupBy === 'imdb') {
		// query = query.groupBy(items.imdb);
	}

	if (categories.length > 0) {
		query = query.where(inArray(items.cat, categories));
	}
	if (searchText !== null && searchText.length > 0) {
		if (imdbMatcher.test(searchText)) {
			query = query.where(eq(items.imdb, searchText));
		} else {
			query = query.where(like(items.title, `%${searchText}%`));
		}
	}
	if (imdb !== null && imdb.length > 0) {
		query = query.where(eq(items.imdb, imdb));
	}
	return query.get();
};

const getItems = async (
	categories: string[],
	order: string,
	asc: boolean,
	limit: number,
	offset: number,
	searchText: string | null,
	groupBy: 'imdb' | 'extId' | '' | null,
	imdb: string | null
) => {
	let query = database.db
		.select({
			id: items.id,
			hash: items.hash,
			title: items.title,
			dt: items.dt,
			cat: items.cat,
			size: items.size,
			ext_id: items.ext_id,
			imdb: items.imdb
		})
		.from(items)
		.orderBy(getOrderBy(order, asc))
		.limit(limit)
		.offset(offset * limit);

	if (groupBy === 'extId') {
		// query = query.groupBy(items.ext_id);
	} else if (groupBy === 'imdb') {
		// query = query.groupBy(items.imdb);
	}

	if (categories.length > 0) {
		query = query.where(inArray(items.cat, categories));
	}
	if (searchText !== null && searchText.length > 0) {
		if (imdbMatcher.test(searchText)) {
			query = query.where(eq(items.imdb, searchText));
		} else {
			query = query.where(like(items.title, `%${searchText}%`));
		}
	}
	if (imdb !== null && imdb.length > 0) {
		query = query.where(eq(items.imdb, imdb));
	}

	return query.all();
};

export const GET = async (event) => {
	const categories = await getCategoryNames();

	const searchCats = event.url.searchParams.getAll('categories');
	const searchCategories = categories.filter((c) => searchCats.includes(c));

	const groupBy = event.url.searchParams.get('group-by');
	const imdb = event.url.searchParams.get('imdb');
	const by = event.url.searchParams.get('by') || 'dt';
	const asc = event.url.searchParams.get('asc') === 'true';
	const limitString = event.url.searchParams.get('limit') || '10';
	const offsetString = event.url.searchParams.get('offset') || '0';
	const searchText = event.url.searchParams.get('search-text');

	const limit = parseInt(limitString);
	if (isNaN(limit)) return json({ error: 'Invalid limit' });
	const offset = parseInt(offsetString);
	if (isNaN(offset)) return json({ error: 'Invalid offset' });
	if (groupBy !== null && groupBy !== 'imdb' && groupBy !== 'extId' && groupBy !== '')
		return json({ error: 'Invalid group-by' });
	if (imdb !== null && !imdbMatcher.test(imdb)) return json({ error: 'Invalid imdb' });

	const items = await getItems(
		searchCategories,
		by,
		asc,
		limit,
		offset,
		searchText,
		groupBy,
		imdb
	);
	const total = await getTotal(searchCategories, searchText, groupBy, imdb);

	return json({ items, total: total.count });
};
