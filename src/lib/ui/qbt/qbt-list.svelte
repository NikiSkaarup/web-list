<script lang="ts">
	import QbtListTd from './qbt-list-td.svelte';
	import IconDots from '@tabler/icons-svelte/dist/svelte/icons/IconDots.svelte';
	import { drawerStore } from '@skeletonlabs/skeleton';

	export let torrents: Array<QbtTorrent>;

	const keys: Array<QbtTorrentsInfoSort> = [
		'name',
		'size',
		'progress',
		'state',
		'num_seeds',
		'num_leechs',
		'dlspeed',
		'upspeed',
		'eta',
		'ratio'
	];

	const filterTorrentObjectKeys = (torrent: QbtTorrent, keys: Array<QbtTorrentsInfoSort>) =>
		Object.entries(torrent)
			.filter(([k]) => keys.includes(k as QbtTorrentsInfoSort))
			.sort(
				([keyA], [keyB]) =>
					keys.indexOf(keyA as QbtTorrentsInfoSort) -
					keys.indexOf(keyB as QbtTorrentsInfoSort)
			) as Array<[QbtTorrentsInfoSort, string | number | boolean | QbtHash]>;

	const openDrawer = (torrent: QbtTorrent) => {
		drawerStore.open({
			id: 'qbt-torrent-drawer',
			meta: { torrent },
			position: 'right',
			bgDrawer: 'backdrop-blur-md bg-surface-900/70 text-white',
			bgBackdrop:
				'bg-gradient-to-tr from-surface-700/10 via-surface-700/20 to-secondary-900/30',
			width: 'w-[280px] md:w-[480px]',
			padding: 'p-4',
			rounded: 'rounded-xl'
		});
	};
</script>

<div class="container mx-auto space-y-8 p-8">
	<div class="table-container">
		<table class="table-hover table table-compact">
			<thead>
				<tr>
					{#each keys as key (key)}
						<th class="table-cell-fit">{key.replace('_', ' ')}</th>
					{/each}
					<th class="table-cell-fit">
						<span class="sr-only">actions</span>
					</th>
				</tr>
			</thead>
			<tbody>
				{#if torrents.length === 0}
					<tr>
						<td colspan={keys.length + 1} class="text-center"> No results </td>
					</tr>
				{:else}
					{#each torrents as torrent (torrent.magnet_uri)}
						<tr>
							{#each filterTorrentObjectKeys(torrent, keys) as [k, v] (k)}
								<QbtListTd key={k} value={v} />
							{/each}
							<td
								class="table-cell-fit"
								style="padding-top:0.375rem !important; padding-bottom:0.375rem !important;"
							>
								<button
									class="btn btn-sm variant-ghost-surface"
									type="button"
									on:click={() => openDrawer(torrent)}
								>
									<IconDots />
								</button>
							</td>
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
</div>
