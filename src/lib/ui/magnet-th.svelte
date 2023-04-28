<script lang="ts">
	type sortByType = 'dt' | 'title' | 'size' | 'cat' | 'imdb' | 'ext_id';
	export let title: string;
	export let sortBy: sortByType;
	export let sort: { by: sortByType; asc: boolean };
	export let setSort: (by: sortByType) => () => void;
	export let fit = false;

	const sortedBy = (by: sortByType, asc: boolean) => sort.by === by && sort.asc === asc;
</script>

<th
	on:click={setSort(sortBy)}
	class:table-sort-asc={sortedBy(sortBy, true)}
	class:table-sort-dsc={sortedBy(sortBy, false)}
	class:table-cell-fit={fit}
>
	{title}
</th>
