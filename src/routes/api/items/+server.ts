import { getCategoryNames } from '$lib/server/categories';
import db from '$lib/server/db';
import { items } from '$lib/server/db/schema';
import { json } from '@sveltejs/kit';
import { sql, asc, desc } from 'drizzle-orm';

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
	title: string | null,
	groupBy: 'imdb' | 'extId' | '' | null,
	imdb: string | null
) => {
	let query = db.select({ count: sql<number>`count(*)` }).from(items);

	if (groupBy === 'extId') query = query.groupBy(items.ext_id);
	else if (groupBy === 'imdb') query = query.groupBy(items.imdb);

	if (categories.length > 0) query = query.where(sql`${items.cat} in ${categories}`);
	if (title) query = query.where(sql`${items.title} like ${'%' + title + '%'}`);
	if (imdb) query = query.where(sql`${items.imdb} like ${'%' + imdb + '%'}`);

	return query.get();
};

const getItems = async (
	categories: string[],
	order: string,
	asc: boolean,
	limit: number,
	offset: number,
	title: string | null,
	groupBy: 'imdb' | 'extId' | '' | null,
	imdb: string | null
) => {
	let query = db
		.select()
		.from(items)
		.orderBy(getOrderBy(order, asc))
		.limit(limit)
		.offset(offset * limit);

	if (groupBy === 'extId') query = query.groupBy(items.ext_id);
	else if (groupBy === 'imdb') query = query.groupBy(items.imdb);

	if (categories.length > 0) query = query.where(sql`${items.cat} in ${categories}`);
	if (title) query = query.where(sql`${items.title} like ${'%' + title + '%'}`);
	if (imdb) query = query.where(sql`${items.imdb} like ${'%' + imdb + '%'}`);

	return query.all();
};

let categories: string[] = [];

const imdbMatcher = /^tt[0-9]{7,9}$/;

export const GET = async (event) => {
	if (categories.length === 0) categories = await getCategoryNames();

	const searchCategories = event.url.searchParams
		.getAll('categories')
		.filter((c) => categories.includes(c));

	const groupBy = event.url.searchParams.get('group-by');
	const imdb = event.url.searchParams.get('imdb');
	const by = event.url.searchParams.get('by') || 'dt';
	const asc = event.url.searchParams.get('asc') === 'true';
	const limitString = event.url.searchParams.get('limit') || '10';
	const offsetString = event.url.searchParams.get('offset') || '0';
	const title = event.url.searchParams.get('title');

	const limit = parseInt(limitString);
	if (isNaN(limit)) return json({ error: 'Invalid limit' });
	const offset = parseInt(offsetString);
	if (isNaN(offset)) return json({ error: 'Invalid offset' });
	if (groupBy !== null && groupBy !== 'imdb' && groupBy !== 'extId' && groupBy !== '')
		return json({ error: 'Invalid group-by' });
	if (imdb !== null && !imdbMatcher.test(imdb)) return json({ error: 'Invalid imdb' });

	const itemsPromise = getItems(searchCategories, by, asc, limit, offset, title, groupBy, imdb);
	const totalPromise = getTotal(searchCategories, title, groupBy, imdb);
	const [items, total] = await Promise.all([itemsPromise, totalPromise]);
	return json({ items, total: total.count });
};
