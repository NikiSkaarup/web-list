import { sql } from "drizzle-orm";
import { items } from "../db/schema";
import db from "$lib/server/db";

const categoriesSelect = db
	.select({ cat: items.cat })
	.from(items)
	.groupBy(items.cat)
	.orderBy(sql`${items.cat} asc nulls last`)
	.prepare();

export const getCategoryNames = async () => {
	const result = await categoriesSelect.all();
	return result.map((r) => r.cat as string);
};
