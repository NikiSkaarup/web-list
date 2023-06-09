<script>
	import QbtList from '$lib/ui/qbt/qbt-list.svelte';
	import { CodeBlock } from '@skeletonlabs/skeleton';
	export let data;
</script>

<QbtList torrents={data.torrents} />

<div class="container mx-auto space-y-8 p-8">
	<CodeBlock language={'json'} code={JSON.stringify(data, null, 2)} lineNumbers={true} />
</div>

<!--
<div class="container mx-auto space-y-8 p-8">
	<form action="" method="post" class="flex flex-wrap gap-4" use:enhance>
		<input
			type="text"
			name="urls"
			class="input"
			placeholder="magnet link"
			value="magnet:?xt=urn:btih:"
		/>
		<input type="text" name="savepath" class="input" placeholder="save path" value="" />
		<input type="text" name="cookie" class="input" placeholder="cookie" value="" />
		<input type="text" name="category" class="input" placeholder="category" value="" />
		<div class="w-full flex flex-wrap gap-x-8 gap-y-4">
			<SlideToggle name="skip_checking" active="bg-surface-500" checked={true}>
				Skip checking
			</SlideToggle>
			<SlideToggle name="paused" active="bg-surface-500" checked={true}>Paused</SlideToggle>
			<SlideToggle name="root_folder" active="bg-surface-500" checked={true}>
				Root folder
			</SlideToggle>
		</div>
		<button class="btn variant-ghost-primary" type="submit">Submit</button>
	</form>

	{#if form}
		<div class="space-y-4">
			<h4 class="">Form response</h4>
			<CodeBlock language={'json'} code={JSON.stringify(form, null, 2)} lineNumbers={true} />
		</div>
	{/if}
</div> -->
