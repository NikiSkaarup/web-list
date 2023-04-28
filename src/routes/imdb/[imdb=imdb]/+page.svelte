<script lang="ts">
	import MagnetTable from '$lib/ui/magnet-table.svelte';
	import { Paginator } from '@skeletonlabs/skeleton';

	export let data;

	let items = data.items;
	let div: HTMLDivElement;
	let sort: {
		by: 'dt' | 'title' | 'size' | 'cat' | 'imdb' | 'ext_id';
		asc: boolean;
	} = {
		by: 'dt',
		asc: false
	};
	let page = {
		offset: 0,
		limit: 10,
		size: data.total,
		amounts: [10, 25, 50, 100]
	};

	const onChange = async () => {
		let input = `/api/items?order=${sort.by}&asc=${sort.asc}&limit=${page.limit}&offset=${page.offset}&imdb=${data.imdb}`;

		const res = await fetch(input, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});

		const result: { items: typeof data.items; total: number } = await res.json();

		items = result.items;
		if (result.total !== page.size) page.size = result.total;
	};
</script>

<div class="container mx-auto space-y-8 p-8">
	<h1>IMDB ID: {data.imdb}</h1>

	<MagnetTable
		{items}
		{sort}
		on:sort={(sortValue) => {
			sort = sortValue.detail;
			setTimeout(onChange, 0);
		}}
	/>

	<Paginator bind:settings={page} on:page={onChange} on:amount={onChange} />
</div>
