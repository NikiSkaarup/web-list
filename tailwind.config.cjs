import { path } from 'path';
import skeletonCjs from '@skeletonlabs/skeleton/tailwind/skeleton.cjs';

/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: 'class',
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		path.join(
			require.resolve('@skeletonlabs/skeleton'),
			'../**/*.{html,js,svelte,ts}'
		)
	],
	theme: {
		extend: {},
	},
	plugins: [
		require('@tailwindcss/forms'),
		...skeletonCjs()
	],
}
