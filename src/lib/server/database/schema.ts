import { integer, sqliteTable, text, index, uniqueIndex } from 'drizzle-orm/sqlite-core';
import { createSelectSchema } from 'drizzle-zod';

export const items = sqliteTable(
	'items',
	{
		id: integer('id').primaryKey(),
		hash: text('hash').notNull(),
		title: text('title').notNull(),
		dt: text('dt').notNull(),
		cat: text('cat').notNull(),
		size: integer('size'),
		ext_id: text('ext_id'),
		imdb: text('imdb')
	},
	(table) => {
		return {
			ix__id: uniqueIndex('ix__id').on(table.id),
			ix__title: index('ix__title').on(table.title),
			ix__dt: index('ix__dt').on(table.dt),
			ix__cat: index('ix__cat').on(table.cat),
			ix__size: index('ix__size').on(table.size),
			ix__ext_id: index('ix__ext_id').on(table.ext_id),
			ix__imdb: index('ix__imdb').on(table.imdb)
		};
	}
);

export const selectItemSchema = createSelectSchema(items);
