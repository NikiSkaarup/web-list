<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import IconMagnet from '@tabler/icons-svelte/dist/svelte/icons/IconMagnet.svelte';

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

	const dispatch = createEventDispatcher<{
		sort: {
			by: 'dt' | 'title' | 'size' | 'cat' | 'imdb' | 'ext_id';
			asc: boolean;
		};
	}>();

	const setSort = (by: 'dt' | 'title' | 'size' | 'cat' | 'imdb' | 'ext_id') => {
		return () => {
			if (sort.by === by) {
				sort.by = by;
				sort.asc = !sort.asc;
			} else {
				sort.by = by;
				sort.asc = true;
			}
			dispatch('sort', sort);
		};
	};

	const getSize = (size: number | undefined | null) => ((size ?? 0) / 1000000000).toFixed(2);
</script>

<div class="table-container">
	<table class="table-hover table">
		<thead>
			<tr>
				<th
					on:click={setSort('title')}
					class:table-sort-asc={sort.by === 'title' && sort.asc}
					class:table-sort-desc={sort.by === 'title' && !sort.asc}
				>
					title
				</th>
				<th
					on:click={setSort('dt')}
					class:table-sort-asc={sort.by === 'dt' && sort.asc}
					class:table-sort-desc={sort.by === 'dt' && !sort.asc}
				>
					date
				</th>
				<th
					on:click={setSort('cat')}
					class:table-sort-asc={sort.by === 'cat' && sort.asc}
					class:table-sort-desc={sort.by === 'cat' && !sort.asc}
				>
					cat
				</th>
				<th
					on:click={setSort('size')}
					class:table-sort-asc={sort.by === 'size' && sort.asc}
					class:table-sort-desc={sort.by === 'size' && !sort.asc}
				>
					size
				</th>
				<th
					on:click={setSort('ext_id')}
					class="table-cell-fit"
					class:table-sort-asc={sort.by === 'ext_id' && sort.asc}
					class:table-sort-desc={sort.by === 'ext_id' && !sort.asc}
				>
					ext_id
				</th>
				<th
					on:click={setSort('imdb')}
					class="table-cell-fit"
					class:table-sort-asc={sort.by === 'imdb' && sort.asc}
					class:table-sort-desc={sort.by === 'imdb' && !sort.asc}
				>
					imdb
				</th>
				<th class="table-cell-fit"><span class="sr-only">actions</span></th>
			</tr>
		</thead>
		<tbody>
			{#each items as item (item.id)}
				<tr>
					<td title={item.title}>
						<span
							class="overflow-hidden text-ellipsis inline-block whitespace-nowrap max-w-lg"
						>
							{#if item.imdb !== null}
								<a href="/imdb/{item.imdb}">{item.title}</a>
							{:else}
								{item.title}
							{/if}
						</span>
					</td>
					<td><span class="whitespace-nowrap">{item.dt}</span></td>
					<td>{item.cat}</td>
					<td><span class="whitespace-nowrap">{getSize(item.size)} GB</span></td>
					<td title={item.ext_id}>
						<span
							class="inline-block overflow-hidden whitespace-nowrap text-ellipsis max-w-[5rem]"
						>
							{item.ext_id}
						</span>
					</td>
					<td class="table-cell-fit" title={item.imdb}>{item.imdb}</td>
					<td class="table-cell-fit">
						<a href="magnet:?xt=urn:btih:{item.hash}">
							<IconMagnet />
						</a>
					</td>
				</tr>
			{/each}
		</tbody>
	</table>
</div>
