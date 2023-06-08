<script lang="ts">
	import { ConicGradient, type ConicStop } from '@skeletonlabs/skeleton';

	const conicStops: Array<ConicStop> = [
		{ color: 'transparent', start: 0, end: 25 },
		{ color: 'rgb(var(--color-primary-500))', start: 75, end: 100 }
	];

	export let loading: boolean = true;
</script>

{#if loading}
	<ConicGradient stops={conicStops} spin>Loading</ConicGradient>
{/if}
