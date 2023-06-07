<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import MagnetTable from '$lib/ui/magnet-table.svelte';
	import { Paginator, SlideToggle } from '@skeletonlabs/skeleton';
	export let data;

	$: items = data.items;
	let div: HTMLDivElement;
	$: sort = {
		by: data.by,
		asc: data.asc
	} as {
		by: sortBy;
		asc: boolean;
	};

	$: settings = {
		offset: data.offset,
		limit: data.limit,
		size: data.total,
		amounts: [10, 25, 50, 100]
	};

	$: searchText = data.searchText ?? '';
	$: loading = false;

	let groupImdb = data.groupImdb;

	const getCategories = () => {
		if (!div) return '';
		const checkboxes = Array.from(
			div.querySelectorAll<HTMLInputElement>('.filter-checkbox:checked')
		);
		const categories = checkboxes
			.filter((input) => input.name === 'categories')
			.map((input) => `categories=${(input as HTMLInputElement).value}`)
			.join('&');
		return categories;
	};

	const onChange = async () => {
		loading = true;
		const categories = getCategories();
		let params = `?by=${sort.by}&asc=${sort.asc}&limit=${settings.limit}&offset=${settings.offset}`;

		if (searchText.length > 0) params += `&search-text=${searchText}`;
		if (categories.length > 0) params += `&${categories}`;
		if (groupImdb) params += `&group-imdb=${groupImdb}`;

		console.log({ params, groupImdb });

		await goto($page.url.pathname + params, {
			keepFocus: true
		});
		loading = false;
	};

	const clear = () => {
		const categories = Array.from(
			div.querySelectorAll<HTMLInputElement>('.filter-checkbox:checked')
		).filter((input) => input.name === 'categories');
		groupImdb = false;
		searchText = '';
		categories.forEach((input) => {
			input.checked = false;
		});
		settings.offset = 0;
		settings = settings;
		onChange();
	};
</script>

<div class="container mx-auto space-y-8 p-8">
	<div bind:this={div} class="flex flex-wrap gap-2">
		<div class="flex w-full flex-row flex-wrap gap-2">
			{#each data.categories as category}
				<label class="flex items-center space-x-2">
					<input
						on:change={onChange}
						class="filter-checkbox checkbox"
						type="checkbox"
						value={category.name}
						checked={category.checked}
						name="categories"
					/>
					<p class="font-mono">{category.name}</p>
				</label>
			{/each}
		</div>

		<input
			class="input"
			type="text"
			name="title"
			placeholder="Search"
			bind:value={data.searchText}
			on:keypress={(e) => {
				if (e.key === 'Enter') {
					onChange();
				}
			}}
		/>

		<button class="btn variant-ghost-surface" type="button" on:click={onChange}>
			Search
		</button>
		<button class="btn variant-ghost-surface" type="reset" on:click={clear}> Clear </button>

		<div class="flex flex-row flex-wrap gap-2 items-center">
			<SlideToggle
				name="slider-label"
				bind:checked={groupImdb}
				on:change={onChange}
				active="bg-surface-500"
			>
				group by IMDB
			</SlideToggle>
		</div>
	</div>

	<MagnetTable limit={settings.limit} {loading} {items} {sort} on:sort={onChange} />

	<Paginator
		bind:settings
		on:page={onChange}
		on:amount={onChange}
		controlVariant="variant-ghost-surface"
		active="variant-ghost-primary"
	/>
</div>
