<script>
	import { CodeBlock } from '@skeletonlabs/skeleton';
	export let data;
</script>

<div class="container mx-auto space-y-8 p-8">
	<div class="table-container">
		<table class="table-hover table">
			<thead>
				{#if data.torrents.length === 0}
					<tr>
						<th colspan="10" class="text-center">No torrents</th>
					</tr>
				{:else}
					<tr>
						{#each Object.keys(data.torrents[0]) as key (key)}
							<th class="table-cell-fit">{key.replace('_', ' ')}</th>
						{/each}
					</tr>
				{/if}
			</thead>
			<tbody>
				{#each data.torrents as torrent (torrent.magnet_uri)}
					<tr>
						{#each Object.entries(torrent) as [key, value] (key)}
							<td class="table-cell-fit" title={value.toLocaleString()}>
								<span
									class="overflow-hidden text-ellipsis inline-block whitespace-nowrap max-w-[10rem]"
								>
									{value}
								</span>
							</td>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

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
