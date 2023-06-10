<script lang="ts">
	import '@catppuccin/highlightjs/css/catppuccin-mocha.css';
	// import '@skeletonlabs/skeleton/themes/theme-skeleton.css';
	// import '@skeletonlabs/skeleton/themes/theme-modern.css';
	// import '@skeletonlabs/skeleton/themes/theme-rocket.css';
	// import '@skeletonlabs/skeleton/themes/theme-seafoam.css';
	// import '@skeletonlabs/skeleton/themes/theme-vintage.css';
	// import '@skeletonlabs/skeleton/themes/theme-sahara.css';
	// import '@skeletonlabs/skeleton/themes/theme-hamlindigo.css';
	// import '@skeletonlabs/skeleton/themes/theme-gold-nouveau.css';
	// import '@skeletonlabs/skeleton/themes/theme-crimson.css';
	import '$lib/../theme.postcss';
	import '@skeletonlabs/skeleton/styles/all.css';
	import '$lib/../app.postcss';
	import {
		AppBar,
		AppShell,
		autoModeWatcher,
		Toast,
		Modal,
		Drawer,
		drawerStore
	} from '@skeletonlabs/skeleton';
	import { storeHighlightJs, storePopup } from '@skeletonlabs/skeleton';
	import hljs from 'highlight.js';
	import { computePosition, autoUpdate, flip, shift, offset, arrow } from '@floating-ui/dom';
	import Trail from '$lib/ui/trail.svelte';
	import Lead from '$lib/ui/lead.svelte';
	import QbtTorrentDrawer from '$lib/ui/qbt/qbt-torrent-drawer.svelte';
	import IconRefreshOff from '@tabler/icons-svelte/dist/svelte/icons/IconRefreshOff.svelte';
	import IconRefresh from '@tabler/icons-svelte/dist/svelte/icons/IconRefresh.svelte';
	import { page } from '$app/stores';
	import { pauseSync, startSync, stopSync, syncing, url } from '$lib/stores/maindata.store';
	import { browser } from '$app/environment';
	import { afterNavigate, beforeNavigate } from '$app/navigation';

	storeHighlightJs.set(hljs);
	storePopup.set({ computePosition, autoUpdate, flip, shift, offset, arrow });

	if (browser) {
		url.set($page.url.origin);
	}

	beforeNavigate(() => {
		if ($syncing) {
			pauseSync.set(true);
		}
	});

	afterNavigate(() => {
		if ($syncing) {
			pauseSync.set(false);
		}
	});
</script>

<svelte:head>
	{@html `<script>${autoModeWatcher.toString()} autoModeWatcher();</script>`}
</svelte:head>

<Drawer>
	{#if $drawerStore.id === 'qbt-torrent-drawer'}
		<QbtTorrentDrawer />
	{/if}
</Drawer>
<Modal />
<Toast />
<AppShell>
	<svelte:fragment slot="header">
		<AppBar>
			<svelte:fragment slot="lead">
				<Lead />
			</svelte:fragment>
			<svelte:fragment slot="default"><span /></svelte:fragment>
			<svelte:fragment slot="trail">
				{#if $page.url.pathname === '/qbt/v2'}
					{#if $syncing}
						<button class="btn btn-sm variant-ghost-surface" on:click={stopSync}>
							<IconRefreshOff size={20} />
						</button>
					{:else}
						<button class="btn btn-sm variant-ghost-surface" on:click={startSync}>
							<IconRefresh size={20} />
						</button>
					{/if}
				{/if}
				<Trail />
			</svelte:fragment>
		</AppBar>
	</svelte:fragment>
	<svelte:fragment slot="sidebarLeft" />
	<svelte:fragment slot="sidebarRight" />
	<svelte:fragment slot="pageHeader" />
	<slot />
	<svelte:fragment slot="pageFooter" />
	<svelte:fragment slot="footer" />
</AppShell>
