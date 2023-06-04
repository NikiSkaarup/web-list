<script lang="ts">
	import { dev } from '$app/environment';
	import { onMount } from 'svelte';

	let fromBody: string | null = null;
	onMount(() => {
		if (dev) fromBody = document.body.getAttribute('data-request-duration');
	});
</script>

{#if dev}
	<div class="fixed bottom-2 right-2 flex flex-col items-end gap-2">
		<div class="flex items-center justify-center bg-black px-1 font-mono text-white">
			<span>{fromBody ?? '0.000'}ms</span>
		</div>
	</div>
{/if}
