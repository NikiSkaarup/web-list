import { type Config } from 'drizzle-kit';

export default {
	out: './migrations',
	schema: './src/lib/server/database/schema.ts',
	breakpoints: true
} satisfies Config;
