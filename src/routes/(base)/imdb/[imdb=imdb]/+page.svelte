<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import MagnetTable from '$lib/ui/magnet-table.svelte';
	import { Paginator } from '@skeletonlabs/skeleton';

	export let data;

	$: items = data.items;
	$: sort = {
		by: data.by,
		asc: data.asc
	} as {
		by: 'dt' | 'title' | 'size' | 'cat' | 'imdb' | 'ext_id';
		asc: boolean;
	};
	$: settings = {
		offset: data.offset,
		limit: data.limit,
		size: data.total,
		amounts: [10, 25, 50, 100]
	};

	let loading = false;

	const onChange = async () => {
		loading = true;
		const params = `?by=${sort.by}&asc=${sort.asc}&limit=${settings.limit}&offset=${settings.offset}&imdb=${data.imdb}`;
		await goto($page.url.pathname + params);
		loading = false;
	};
</script>

<div class="container mx-auto space-y-8 p-8">
	<h1>IMDB ID: {data.imdb}</h1>

	<MagnetTable
		limit={settings.limit}
		{loading}
		{items}
		{sort}
		on:sort={async (sortValue) => {
			sort = sortValue.detail;
			await onChange();
		}}
	/>

	<Paginator
		bind:settings
		on:page={onChange}
		on:amount={onChange}
		controlVariant="variant-ghost-surface"
		active="variant-ghost-primary"
	/>
</div>
