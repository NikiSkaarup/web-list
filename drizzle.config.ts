import { type Config } from 'drizzle-kit';

export default {
	out: './migrations',
	schema: './src/lib/server/db/schema.ts',
	breakpoints: true,
} satisfies Config;
