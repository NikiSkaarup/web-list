<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import IconMagnet from '@tabler/icons-svelte/dist/svelte/icons/IconMagnet.svelte';
	import MagnetTh from './magnet-th.svelte';

	export let items: {
		id: number;
		hash: string;
		title: string;
		dt: string;
		cat: string;
		size: number | null;
		ext_id: string | null;
		imdb: string | null;
	}[];

	export let sort: {
		by: 'dt' | 'title' | 'size' | 'cat' | 'imdb' | 'ext_id';
		asc: boolean;
	};

	export let limit: number = 10;
	export let loading: boolean = false;

	const dispatch = createEventDispatcher<{
		sort: {
			by: 'dt' | 'title' | 'size' | 'cat' | 'imdb' | 'ext_id';
			asc: boolean;
		};
	}>();

	const setSort = (by: 'dt' | 'title' | 'size' | 'cat' | 'imdb' | 'ext_id') => () => {
		if (sort.by === by) {
			sort.by = by;
			sort.asc = !sort.asc;
		} else {
			sort.by = by;
			sort.asc = true;
		}
		dispatch('sort', sort);
	};

	const getSize = (size: number | undefined | null) => ((size ?? 0) / 1000000000).toFixed(2);

	let tableHeight: number | undefined = undefined;
</script>

<div class="table-container">
	{#if loading}
		<div class="flex flex-col gap-1" style="height: {tableHeight ?? 642}px">
			{#each Array(limit + 1) as _}
				<div class="placeholder animate-pulse flex-1" />
			{/each}
		</div>
	{:else}
		<table class="table-hover table" bind:clientHeight={tableHeight}>
			<thead>
				<tr>
					<MagnetTh title="title" sortBy="title" {sort} {setSort} />
					<MagnetTh title="date" sortBy="dt" {sort} {setSort} />
					<MagnetTh title="category" sortBy="cat" {sort} {setSort} />
					<MagnetTh title="size" sortBy="size" {sort} {setSort} />
					<MagnetTh title="ext_id" sortBy="ext_id" {sort} {setSort} />
					<MagnetTh title="imdb" sortBy="imdb" {sort} {setSort} />
					<th class="table-cell-fit"><span class="sr-only">actions</span></th>
				</tr>
			</thead>
			<tbody>
				{#each items as item (item.id)}
					<tr>
						<td title={item.title}>
							<span
								class="overflow-hidden text-ellipsis inline-block whitespace-nowrap sm:max-w-xs lg:max-w-sm xl:max-w-lg 2xl:max-w-xl 3xl:max-w-2xl 4xl:max-w-3xl 5xl:max-w-4xl 6xl:max-w-5xl"
							>
								{item.title}
							</span>
						</td>
						<td class="table-cell-fit font-mono">
							<span class="whitespace-nowrap">{item.dt}</span>
						</td>
						<td class="table-cell-fit font-mono">{item.cat}</td>
						<td class="table-cell-fit font-mono">
							<span class="whitespace-nowrap">{getSize(item.size)} GB</span>
						</td>
						<td class="table-cell-fit font-mono" title={item.ext_id}>
							{#if item.ext_id !== null}
								<span
									class="overflow-hidden text-ellipsis inline-block whitespace-nowrap max-w-[5rem]"
								>
									{item.ext_id}
								</span>
							{/if}
						</td>
						<td class="table-cell-fit font-mono" title={item.imdb}>
							{#if item.imdb !== null}
								<a
									class="anchor inline-block whitespace-nowrap"
									href="/imdb/{item.imdb}"
								>
									{item.imdb}
								</a>
							{/if}
						</td>
						<td class="table-cell-fit">
							<a href="anchor magnet:?xt=urn:btih:{item.hash}">
								<IconMagnet size={20} />
							</a>
						</td>
					</tr>
				{/each}
			</tbody>
		</table>
	{/if}
</div>
