import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';
import { createSelectSchema } from 'drizzle-zod';

export const items = sqliteTable('items', {
	id: integer('id').primaryKey(),
	hash: text('hash').notNull(),
	title: text('title').notNull(),
	dt: text('dt').notNull(),
	cat: text('cat').notNull(),
	size: integer('size'),
	ext_id: text('ext_id'),
	imdb: text('imdb'),
});
export const selectItemSchema = createSelectSchema(items);
