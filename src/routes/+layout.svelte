<script lang="ts">
	import '@catppuccin/highlightjs/css/catppuccin-mocha.css';
	import '$lib/../theme.postcss';
	import '$lib/../app.postcss';
	import {
		AppBar,
		autoModeWatcher,
		Toast,
		Modal,
		Drawer,
		initializeStores
	} from '@skeletonlabs/skeleton';
	import { storeHighlightJs, storePopup } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';

	storeHighlightJs.set(hljs);
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });
	initializeStores();
</script>

<svelte:head>{@html '<script>(' + autoModeWatcher.toString() + ')();</script>'}</svelte:head>

<Drawer />
<Modal />
<Toast />

<div class="grid grid-rows-[auto_1fr_auto]">
	<header>
		<AppBar>
			<svelte:fragment slot="lead">
				<a href="/">
					<strong class="text-xl uppercase">web-list</strong>
				</a>
			</svelte:fragment>
			<svelte:fragment slot="default"><span></span></svelte:fragment>
			<svelte:fragment slot="trail">
				<a class="btn btn-sm variant-ghost-surface" href="/"> Search </a>
				<a
					class="btn btn-sm variant-ghost-surface"
					href="https://github.com/nikiskaarup/web-list"
					target="_blank"
					rel="noreferrer"
				>
					GitHub
				</a>
			</svelte:fragment>
		</AppBar>
	</header>
	<main>
		<slot />
	</main>
</div>
