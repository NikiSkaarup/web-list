import { getCategoryNames } from '$lib/server/categories';
import database from '$lib/server/database';
import { items } from '$lib/server/database/schema';
import { json } from '@sveltejs/kit';
import { sql, asc, desc, eq, inArray, like, and, isNotNull, SQL } from 'drizzle-orm';

const imdbMatcher = /^tt[0-9]{6,9}$/;

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
	groupImdb: boolean,
	imdb: string | null
) => {
	let query = database.db.select({ count: sql<number>`count(*)` }).from(items);

	const wheres: SQL<unknown>[] = [];

	if (categories.length > 0) {
		wheres.push(inArray(items.cat, categories));
	}

	const text = searchText?.trim();
	if (text && text.length > 0) {
		if (imdbMatcher.test(text)) {
			wheres.push(eq(items.imdb, text));
		} else {
			const value = text.replace(/\s/, '_');
			wheres.push(like(items.title, `%${value}%`));
		}
	}

	if (imdb && imdb.length > 0) {
		wheres.push(eq(items.imdb, imdb));
	}

	if (groupImdb) {
		wheres.push(isNotNull(items.imdb));
		query = database.db
			.select({ count: sql<number>`count(DISTINCT ${items.imdb})` })
			.from(items);
	}

	if (wheres.length > 1) {
		return query.where(and(...wheres)).get();
	} else if (wheres.length > 0) {
		return query.where(wheres[0]).get();
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
	groupImdb: boolean,
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
		.from(items);

	const wheres: SQL<unknown>[] = [];

	if (categories.length > 0) {
		wheres.push(inArray(items.cat, categories));
	}

	const text = searchText?.trim();
	if (text && text.length > 0) {
		if (imdbMatcher.test(text)) {
			wheres.push(eq(items.imdb, text));
		} else {
			const value = text.replace(/\s/, '_');
			wheres.push(like(items.title, `%${value}%`));
		}
	}

	if (imdb && imdb.length > 0) {
		wheres.push(eq(items.imdb, imdb));
	}

	if (groupImdb) {
		wheres.push(isNotNull(items.imdb));
		if (wheres.length > 1) {
			return query
				.groupBy(items.imdb)
				.where(and(...wheres))
				.orderBy(getOrderBy(order, asc))
				.limit(limit)
				.offset(offset * limit)
				.all();
		} else if (wheres.length > 0) {
			return query
				.groupBy(items.imdb)
				.where(wheres[0])
				.orderBy(getOrderBy(order, asc))
				.limit(limit)
				.offset(offset * limit)
				.all();
		} else {
			return query
				.groupBy(items.imdb)
				.orderBy(getOrderBy(order, asc))
				.limit(limit)
				.offset(offset * limit)
				.all();
		}
	}

	if (wheres.length > 1) {
		return query
			.where(and(...wheres))
			.orderBy(getOrderBy(order, asc))
			.limit(limit)
			.offset(offset * limit)
			.all();
	} else if (wheres.length > 0) {
		return query
			.where(wheres[0])
			.orderBy(getOrderBy(order, asc))
			.limit(limit)
			.offset(offset * limit)
			.all();
	}

	return query
		.orderBy(getOrderBy(order, asc))
		.limit(limit)
		.offset(offset * limit)
		.all();
};

export const GET = async (event) => {
	const categories = await getCategoryNames();

	const searchCats = event.url.searchParams.getAll('categories');
	const searchCategories = categories.filter((c) => searchCats.includes(c));

	const groupImdb = event.url.searchParams.get('group-imdb') === 'true';
	const imdb = event.url.searchParams.get('imdb');
	const by = event.url.searchParams.get('by') || 'dt';
	const asc = event.url.searchParams.get('asc') === 'true';
	const limitString = event.url.searchParams.get('limit') || '10';
	const offsetString = event.url.searchParams.get('offset') || '0';
	const searchText = event.url.searchParams.get('search-text');

	const limit = Number.parseInt(limitString);
	if (Number.isNaN(limit)) return json({ error: 'Invalid limit' });
	const offset = Number.parseInt(offsetString);
	if (Number.isNaN(offset)) return json({ error: 'Invalid offset' });
	if (imdb !== null && !imdbMatcher.test(imdb)) return json({ error: 'Invalid imdb' });

	const items = await getItems(
		searchCategories,
		by,
		asc,
		limit,
		offset,
		searchText,
		groupImdb,
		imdb
	);
	const total = await getTotal(searchCategories, searchText, groupImdb, imdb);

	return json({ items, total: total?.count ?? 0 });
};
