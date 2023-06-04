<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import MagnetTable from '$lib/ui/magnet-table.svelte';
	import { Paginator } from '@skeletonlabs/skeleton';
	export let data;

	let items = data.items;
	let div: HTMLDivElement;

	const sort: {
		by: sortBy;
		asc: boolean;
	} = {
		by: data.by,
		asc: data.asc
	};

	let settings = {
		offset: data.offset,
		limit: data.limit,
		size: data.total,
		amounts: [10, 25, 50, 100]
	};

	const getInputs = () => {
		const checkboxes = Array.from(
			div.querySelectorAll<HTMLInputElement>('.filter-checkbox:checked')
		);
		const radio = Array.from(div.querySelectorAll<HTMLInputElement>('.filter-radio'));
		const title = div.querySelector<HTMLInputElement>('.filter-title');

		return {
			categories: checkboxes.filter((input) => input.name === 'categories'),
			groupBy: radio.filter((input) => input.name === 'group-by'),
			title
		};
	};

	let abortController = new AbortController();
	let running = false;
	let timeout: string | number | NodeJS.Timeout | undefined = undefined;

	const onChange = async () => {
		if (running) {
			abortController.abort({ name: 'AbortError', message: 'aborted, no longer needed' });
			clearTimeout(timeout);
		}

		running = true;
		abortController = new AbortController();

		try {
			let params = `?by=${sort.by}&asc=${sort.asc}&limit=${settings.limit}&offset=${settings.offset}`;

			const inputs = getInputs();
			const categories = inputs.categories.map((input) => (input as HTMLInputElement).value);
			const groupBys = inputs.groupBy.filter((input) => input.checked);

			if (inputs.title && inputs.title.value.length > 0)
				params += '&title=' + inputs.title.value;

			if (categories.length > 0)
				params += '&' + categories.map((category) => `categories=${category}`).join('&');

			if (groupBys.length > 0 && groupBys[0].value !== '') {
				const groupBy = groupBys[0].value;
				params += `&group-by=${groupBy}`;
			}

			timeout = setTimeout(() => {
				abortController.abort('timeout');
			}, 2500);

			let input = '/api/items' + params;

			const res = await fetch(input, {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				},
				signal: abortController.signal
			});
			clearTimeout(timeout);

			const result: { items: typeof data.items; total: number } = await res.json();

			items = result.items;
			if (result.total !== settings.size) settings.size = result.total;
			running = false;
			goto($page.url.pathname + params, { replaceState: false, invalidateAll: false });
		} catch (e: any) {
			if (e.name !== 'AbortError') {
				running = false;
			}
		}
	};

	const clear = () => {
		const inputs = getInputs();
		if (inputs.title) inputs.title.value = '';
		inputs.categories.forEach((input) => {
			input.checked = false;
		});
		inputs.groupBy.forEach((input) => {
			input.checked = false;
		});
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
					checked={data.groupBy === 'extId'}
				/>
				<p>group by EXT ID</p>
			</label>
		</div>
	</div>

	<MagnetTable {items} {sort} on:sort={() => onChange()} />

	<Paginator bind:settings on:page={onChange} on:amount={onChange} />
</div>
