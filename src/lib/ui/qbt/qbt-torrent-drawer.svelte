<script lang="ts">
	import { enhance } from '$app/forms';
	import { drawerStore } from '@skeletonlabs/skeleton';
	let torrent: QbtTorrent = $drawerStore.meta.torrent;
	$: fields = { ...torrent };
</script>

<div class="p-4 space-y-4">
	<h2>{torrent.name}</h2>
	<span class="text-sm text-gray-400">({torrent.hash})</span>

	<form class="form flex flex-col gap-4" action="" method="post" use:enhance>
		<label class="label">
			<span>Name</span>
			<input class="input" type="text" placeholder="Name" value={fields.name} />
		</label>
		<label class="label">
			<span>Name</span>
			<input class="input" type="text" placeholder="Name" value={fields.name} />
		</label>
		<label class="label">
			<span>Name</span>
			<input class="input" type="text" placeholder="Name" value={fields.name} />
		</label>
		<label class="label">
			<span>Name</span>
			<input class="input" type="text" placeholder="Name" value={fields.name} />
		</label>
		<label class="label">
			<span>Name</span>
			<input class="input" type="text" placeholder="Name" value={fields.name} />
		</label>
		<label class="label">
			<span>Name</span>
			<input class="input" type="text" placeholder="Name" value={fields.name} />
		</label>
		<label class="label">
			<span>Name</span>
			<input class="input" type="text" placeholder="Name" value={fields.name} />
		</label>
		<label class="label">
			<span>Name</span>
			<input class="input" type="text" placeholder="Name" value={fields.name} />
		</label>
		<label class="label">
			<span>Name</span>
			<input class="input" type="text" placeholder="Name" value={fields.name} />
		</label>
		<label class="label">
			<span>Name</span>
			<input class="input" type="text" placeholder="Name" value={fields.name} />
		</label>
		<label class="label">
			<span>Name</span>
			<input class="input" type="text" placeholder="Name" value={fields.name} />
		</label>
		<label class="label">
			<span>Name</span>
			<input class="input" type="text" placeholder="Name" value={fields.name} />
		</label>
		<label class="label">
			<span>Name</span>
			<input class="input" type="text" placeholder="Name" value={fields.name} />
		</label>
		<label class="label">
			<span>Name</span>
			<input class="input" type="text" placeholder="Name" value={fields.name} />
		</label>
	</form>
</div>
