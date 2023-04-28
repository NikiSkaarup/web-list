import adapter from '@sveltejs/adapter-auto';
import { vitePreprocess } from '@sveltejs/kit/vite';

/** @type {import('@sveltejs/kit').Config & { vitePlugin?: import("@sveltejs/vite-plugin-svelte").PluginOptions}} */
const config = {
	preprocess: vitePreprocess(),
	kit: {
		adapter: adapter()
	},
	compilerOptions: {
		sourcemap: process.env.NODE_ENV === 'development'
	}
};

export default config;
