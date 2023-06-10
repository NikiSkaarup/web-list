<script lang="ts">
	import { enhance } from '$app/forms';
	import { InputChip, ProgressBar, SlideToggle, drawerStore } from '@skeletonlabs/skeleton';
	import { slide } from 'svelte/transition';
	let torrent: QbtTorrent = $drawerStore.meta.torrent;
	let fields = { ...torrent };
	let tagsWhiteList = ['hello', 'world'];
	let existingTags: Array<string> = torrent.tags.split(',').map((tag) => tag.trim());
	let existingCategories: Array<string> = ['hello', 'world'];
	let newTags: Array<string> = [];
	let addNewTags = false;

	const reset = () => {
		fields = { ...torrent };
		existingTags = torrent.tags.split(',').map((tag) => tag.trim());
		newTags = [];
		addNewTags = false;
	};
</script>

<div class="space-y-4 h-full">
	<form
		class="form flex flex-col gap-4 relative h-full py-4"
		action="?/qbt/api/v2/form"
		method="post"
		use:enhance
	>
		<legend class="legend px-4">
			<h3 class="text-lg">Edit torrent</h3>
			<p class="text-sm text-gray-400 max-w-full" title={torrent.name}>{torrent.name}</p>
			<p class="text-sm text-gray-400 max-w-full" title={torrent.hash}>{torrent.hash}</p>
			<div class="pt-1">
				<ProgressBar meter="variant-filled-secondary" value={fields.progress * 100} />
			</div>
		</legend>
		<input class="input" type="hidden" name="hash" bind:value={torrent.hash} />
		<div class="flex-grow flex flex-col space-y-4 overflow-y-auto px-4">
			<label class="label">
				<span>Name</span>
				<input
					class="input"
					type="text"
					name="name"
					placeholder="Name"
					bind:value={fields.name}
				/>
			</label>
			<div class="label">
				<div class="flex justify-between">
					<span>Tags (existing)</span>
				</div>
				<InputChip
					bind:value={existingTags}
					name="tags"
					placeholder="Add existing tags to the torrent"
					chips="variant-filled-secondary"
					tagWhiteList={tagsWhiteList}
				/>
			</div>
			<div class="flex flex-col">
				<SlideToggle name="newTags" bind:checked={addNewTags} disabled={newTags.length > 0}>
					<span class="select-none">
						{#if newTags.length > 0}
							disabled until new tags is empty
						{:else if addNewTags}
							Don't add new tags
						{:else}
							Add new tags
						{/if}
					</span>
				</SlideToggle>
				{#if newTags.length > 0 || addNewTags}
					<div transition:slide|local={{ axis: 'y' }} class="label pt-2">
						<span>Tags (new)</span>
						<InputChip
							bind:value={newTags}
							name="tags"
							placeholder="Enter new tags and add them to the torrent"
							chips="variant-filled-secondary"
						/>
					</div>
				{/if}
			</div>
			<label class="label">
				<span>added_on</span>
				<input
					name="added_on"
					class="input"
					type="text"
					readonly={true}
					placeholder="added_on"
					bind:value={fields.added_on}
				/>
			</label>
			<label class="label">
				<span>amount_left</span>
				<input
					name="amount_left"
					class="input"
					type="text"
					readonly={true}
					placeholder="amount_left"
					bind:value={fields.amount_left}
				/>
			</label>
			<SlideToggle name="auto_tmm" bind:checked={fields.auto_tmm}>
				<span>Auto torrent management</span>
			</SlideToggle>
			<label class="label">
				<span>availability</span>
				<input
					name="availability"
					class="input"
					type="text"
					readonly={true}
					placeholder="availability"
					bind:value={fields.availability}
				/>
			</label>
			<label class="label">
				<span>category</span>
				<input
					name="category"
					class="input"
					type="text"
					placeholder="category"
					list="categories"
					bind:value={fields.category}
				/>
			</label>
			<label class="label">
				<span>completed</span>
				<input
					name="completed"
					class="input"
					type="text"
					readonly={true}
					placeholder="completed"
					bind:value={fields.completed}
				/>
			</label>
			<label class="label">
				<span>completion_on</span>
				<input
					name="completion_on"
					class="input"
					type="text"
					readonly={true}
					placeholder="completion_on"
					bind:value={fields.completion_on}
				/>
			</label>
			<label class="label">
				<span>content_path</span>
				<input
					name="content_path"
					class="input"
					type="text"
					placeholder="content_path"
					bind:value={fields.content_path}
				/>
			</label>
			<label class="label">
				<span>dl_limit</span>
				<input
					name="dl_limit"
					class="input"
					type="text"
					placeholder="dl_limit"
					bind:value={fields.dl_limit}
				/>
			</label>
			<label class="label">
				<span>dlspeed</span>
				<input
					name="dlspeed"
					class="input"
					type="text"
					placeholder="dlspeed"
					bind:value={fields.dlspeed}
				/>
			</label>
			<label class="label">
				<span>downloaded</span>
				<input
					name="downloaded"
					class="input"
					type="text"
					readonly={true}
					placeholder="downloaded"
					bind:value={fields.downloaded}
				/>
			</label>
			<label class="label">
				<span>downloaded_session</span>
				<input
					name="downloaded_session"
					class="input"
					type="text"
					readonly={true}
					placeholder="downloaded_session"
					bind:value={fields.downloaded_session}
				/>
			</label>
			<label class="label">
				<span>eta</span>
				<input
					name="eta"
					class="input"
					type="text"
					readonly={true}
					placeholder="eta"
					bind:value={fields.eta}
				/>
			</label>
			<SlideToggle name="f_l_piece_prio" bind:checked={fields.f_l_piece_prio}>
				<span>Prioritize first and last piece</span>
			</SlideToggle>
			<SlideToggle name="force_start" bind:checked={fields.force_start}>
				<span>Force start</span>
			</SlideToggle>
			<label class="label">
				<span>hash</span>
				<input
					name="hash"
					class="input"
					type="text"
					readonly={true}
					placeholder="hash"
					bind:value={fields.hash}
				/>
			</label>
			<label class="label">
				<span>last_activity</span>
				<input
					name="last_activity"
					class="input"
					type="text"
					readonly={true}
					placeholder="last_activity"
					bind:value={fields.last_activity}
				/>
			</label>
			<label class="label">
				<span>magnet_uri</span>
				<input
					name="magnet_uri"
					class="input"
					type="text"
					readonly={true}
					placeholder="magnet_uri"
					bind:value={fields.magnet_uri}
				/>
			</label>
			<label class="label">
				<span>max_ratio</span>
				<input
					name="max_ratio"
					class="input"
					type="text"
					placeholder="max_ratio"
					bind:value={fields.max_ratio}
				/>
			</label>
			<label class="label">
				<span>max_seeding_time</span>
				<input
					name="max_seeding_time"
					class="input"
					type="text"
					placeholder="max_seeding_time"
					bind:value={fields.max_seeding_time}
				/>
			</label>
			<label class="label">
				<span>num_complete</span>
				<input
					name="num_complete"
					class="input"
					type="text"
					readonly={true}
					placeholder="num_complete"
					bind:value={fields.num_complete}
				/>
			</label>
			<label class="label">
				<span>num_incomplete</span>
				<input
					name="num_incomplete"
					class="input"
					type="text"
					readonly={true}
					placeholder="num_incomplete"
					bind:value={fields.num_incomplete}
				/>
			</label>
			<label class="label">
				<span>num_leechs</span>
				<input
					name="num_leechs"
					class="input"
					type="text"
					readonly={true}
					placeholder="num_leechs"
					bind:value={fields.num_leechs}
				/>
			</label>
			<label class="label">
				<span>num_seeds</span>
				<input
					name="num_seeds"
					class="input"
					type="text"
					readonly={true}
					placeholder="num_seeds"
					bind:value={fields.num_seeds}
				/>
			</label>
			<label class="label">
				<span>priority</span>
				<input
					name="priority"
					class="input"
					type="text"
					placeholder="priority"
					bind:value={fields.priority}
				/>
			</label>
			<label class="label">
				<span>ratio</span>
				<input
					name="ratio"
					class="input"
					type="text"
					placeholder="ratio"
					bind:value={fields.ratio}
				/>
			</label>
			<label class="label">
				<span>ratio_limit</span>
				<input
					name="ratio_limit"
					class="input"
					type="text"
					placeholder="ratio_limit"
					bind:value={fields.ratio_limit}
				/>
			</label>
			<label class="label">
				<span>save_path</span>
				<input
					name="save_path"
					class="input"
					type="text"
					placeholder="save_path"
					bind:value={fields.save_path}
				/>
			</label>
			<label class="label">
				<span>seeding_time</span>
				<input
					name="seeding_time"
					class="input"
					type="text"
					placeholder="seeding_time"
					bind:value={fields.seeding_time}
				/>
			</label>
			<label class="label">
				<span>seeding_time_limit</span>
				<input
					name="seeding_time_limit"
					class="input"
					type="text"
					placeholder="seeding_time_limit"
					bind:value={fields.seeding_time_limit}
				/>
			</label>
			<label class="label">
				<span>seen_complete</span>
				<input
					name="seen_complete"
					class="input"
					type="text"
					readonly={true}
					placeholder="seen_complete"
					bind:value={fields.seen_complete}
				/>
			</label>
			<SlideToggle name="seq_dl" bind:checked={fields.seq_dl}>
				<span>Download sequentially</span>
			</SlideToggle>
			<label class="label">
				<span>size</span>
				<input
					name="size"
					class="input"
					type="text"
					readonly={true}
					placeholder="size"
					bind:value={fields.size}
				/>
			</label>
			<label class="label">
				<span>state</span>
				<input
					name="state"
					class="input"
					type="text"
					readonly={true}
					placeholder="state"
					bind:value={fields.state}
				/>
			</label>
			<SlideToggle name="super_seeding" bind:checked={fields.super_seeding}>
				<span>Super Seeding</span>
			</SlideToggle>
			<label class="label">
				<span>time_active</span>
				<input
					name="time_active"
					class="input"
					type="text"
					placeholder="time_active"
					bind:value={fields.time_active}
				/>
			</label>
			<label class="label">
				<span>total_size</span>
				<input
					name="total_size"
					class="input"
					type="text"
					placeholder="total_size"
					bind:value={fields.total_size}
				/>
			</label>
			<label class="label">
				<span>tracker</span>
				<input
					name="tracker"
					class="input"
					type="text"
					placeholder="tracker"
					bind:value={fields.tracker}
				/>
			</label>
			<label class="label">
				<span>up_limit</span>
				<input
					name="up_limit"
					class="input"
					type="text"
					placeholder="up_limit"
					bind:value={fields.up_limit}
				/>
			</label>
			<label class="label">
				<span>uploaded</span>
				<input
					name="uploaded"
					class="input"
					type="text"
					placeholder="uploaded"
					bind:value={fields.uploaded}
				/>
			</label>
			<label class="label">
				<span>uploaded_session</span>
				<input
					name="uploaded_session"
					class="input"
					type="text"
					placeholder="uploaded_session"
					bind:value={fields.uploaded_session}
				/>
			</label>
			<label class="label">
				<span>upspeed</span>
				<input
					name="upspeed"
					class="input"
					type="text"
					placeholder="upspeed"
					bind:value={fields.upspeed}
				/>
			</label>
		</div>
		<div class="flex gap-4 justify-between px-4">
			<button class="btn variant-filled-secondary" type="submit"> save </button>
			<div class="flex gap-4">
				<button
					class="btn variant-filled-surface"
					type="button"
					on:click={drawerStore.close}
				>
					close
				</button>
				<button class="btn variant-filled-error" type="button" on:click={reset}>
					reset
				</button>
			</div>
		</div>
	</form>
	<datalist id="categories">
		{#each existingCategories as category (category)}
			<option value={category} />
		{/each}
	</datalist>
</div>
