<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import MagnetTable from '$lib/ui/magnet-table.svelte';
	import { Paginator } from '@skeletonlabs/skeleton';
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

	$: loading = false;

	const getValues = () => {
		if (!div) return { categories: '', groupBy: '', title: '' };

		const checkboxes = Array.from(
			div.querySelectorAll<HTMLInputElement>('.filter-checkbox:checked')
		);
		const categories = checkboxes
			.filter((input) => input.name === 'categories')
			.map((input) => `categories=${(input as HTMLInputElement).value}`)
			.join('&');
		const radio = Array.from(div.querySelectorAll<HTMLInputElement>('.filter-radio'));
		const groupByArr = radio
			.filter((input) => input.name === 'group-by')
			.filter((input) => input.checked);
		const title = div.querySelector<HTMLInputElement>('.filter-title');

		return {
			categories,
			groupBy: groupByArr.length > 0 ? groupByArr[0].value : '',
			title: title && title.value.length > 0 ? title.value : ''
		};
	};

	const onChange = async () => {
		loading = true;
		const { categories, groupBy, title } = getValues();
		let params = `?by=${sort.by}&asc=${sort.asc}&limit=${settings.limit}&offset=${settings.offset}`;

		if (title.length > 0) params += `&title=${title}`;
		if (categories.length > 0) params += `&${categories}`;
		if (groupBy.length > 0) params += `&group-by=${groupBy}`;

		await goto($page.url.pathname + params, {
			keepFocus: true
		});
		loading = false;
	};

	const clear = () => {
		const categories = Array.from(
			div.querySelectorAll<HTMLInputElement>('.filter-checkbox:checked')
		).filter((input) => input.name === 'categories');
		const groupBy = Array.from(div.querySelectorAll<HTMLInputElement>('.filter-radio')).filter(
			(input) => input.name === 'group-by'
		);
		const title = div.querySelector<HTMLInputElement>('.filter-title');
		if (title) title.value = '';
		categories.forEach((input) => {
			input.checked = false;
		});
		groupBy.forEach((input) => {
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
					<p>{category.name}</p>
				</label>
			{/each}
		</div>

		<input
			class="filter-title input"
			type="text"
			name="title"
			placeholder="Search"
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

		<div class="flex flex-row flex-wrap gap-2">
			<input
				on:change={onChange}
				class="hidden filter-radio"
				type="radio"
				name="group-by"
				checked={true}
				value=""
			/>
			<label class="flex items-center space-x-2">
				<input
					on:change={onChange}
					class="radio filter-radio"
					type="radio"
					name="group-by"
					value="imdb"
					class:cursor-not-allowed={true}
					disabled={true}
					checked={data.groupBy === 'imdb'}
				/>
				<p>group by IMDB</p>
			</label>
			<label class="flex items-center space-x-2">
				<input
					on:change={onChange}
					class="radio filter-radio"
					type="radio"
					name="group-by"
					value="extId"
					class:cursor-not-allowed={true}
					disabled={true}
					checked={data.groupBy === 'extId'}
				/>
				<p>group by EXT ID</p>
			</label>
		</div>
	</div>

	<MagnetTable limit={settings.limit} {loading} {items} {sort} on:sort={onChange} />

	<Paginator bind:settings on:page={onChange} on:amount={onChange} />
</div>
