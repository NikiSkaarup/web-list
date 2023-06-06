import { sql } from 'drizzle-orm';
import { items } from '../database/schema';
import database from '$lib/server/database';

const categoriesSelect = database.db
	.select({ cat: sql<string>`distinct ${items.cat}` })
	.from(items)
	.prepare();

let categories: string[] = [];
export const getCategoryNames = async () => {
	if (categories.length === 0) {
		const result = await categoriesSelect.all();
		categories = result.map((r) => r.cat as string).sort((a, b) => a.localeCompare(b));
	}

	return categories;
};
