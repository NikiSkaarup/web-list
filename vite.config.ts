import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { svelteInspector } from '@sveltejs/vite-plugin-svelte-inspector';
import { purgeCss } from 'vite-plugin-tailwind-purgecss';

export default defineConfig({
	plugins: [sveltekit(), svelteInspector(), purgeCss()],
	server: {
		port: 5163
	}
});
