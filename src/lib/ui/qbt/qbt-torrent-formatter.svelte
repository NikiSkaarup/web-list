<script lang="ts">
	import { bytesToHumanReadable } from '$lib/converters/byte';
	import { qbtStateToHumanReadable } from '$lib/converters/qbt-state';
	import { secondsToHumanReadable } from '$lib/converters/time';
	import IconInfinity from '@tabler/icons-svelte/dist/svelte/icons/IconInfinity.svelte';

	export let key: QbtTorrentsInfoSort;
	export let value: string | number | boolean | QbtHash | QbtTorrentState | undefined | null;
</script>

{#if typeof value === 'number'}
	{#if key === 'added_on'}
		{value}
	{:else if key === 'amount_left'}
		{@html bytesToHumanReadable(value)}
	{:else if key === 'availability'}
		{value}
	{:else if key === 'completed'}
		{@html bytesToHumanReadable(value)}
	{:else if key === 'completion_on'}
		{value}
	{:else if key === 'dl_limit'}
		{#if value === -1}
			<IconInfinity />
		{:else}
			{@html bytesToHumanReadable(value)}/s
		{/if}
	{:else if key === 'dlspeed'}
		{@html bytesToHumanReadable(value)}/s
	{:else if key === 'downloaded_session'}
		{@html bytesToHumanReadable(value)}
	{:else if key === 'downloaded'}
		{@html bytesToHumanReadable(value)}
	{:else if key === 'eta'}
		{#if value === 8640000}
			<IconInfinity />
		{:else}
			{@html secondsToHumanReadable(value)}
		{/if}
	{:else if key === 'last_activity'}
		{value}
	{:else if key === 'max_ratio'}
		{value}
	{:else if key === 'max_seeding_time'}
		{@html secondsToHumanReadable(value)}
	{:else if key === 'name'}
		{value}
	{:else if key === 'num_complete'}
		{value}
	{:else if key === 'num_incomplete'}
		{value}
	{:else if key === 'num_leechs'}
		{value}
	{:else if key === 'num_seeds'}
		{value}
	{:else if key === 'priority'}
		{value}
	{:else if key === 'progress'}
		{value.toFixed(2)}%
	{:else if key === 'ratio_limit'}
		{value}
	{:else if key === 'ratio'}
		{value}
	{:else if key === 'seeding_time_limit'}
		{#if value === -1}
			n/a
		{:else if value === -2}
			auto
		{:else}
			{@html secondsToHumanReadable(value)}
		{/if}
	{:else if key === 'seeding_time'}
		{@html secondsToHumanReadable(value)}
	{:else if key === 'seen_complete'}
		{value}
	{:else if key === 'size'}
		{@html bytesToHumanReadable(value)}
	{:else if key === 'time_active'}
		{@html secondsToHumanReadable(value)}
	{:else if key === 'total_size'}
		{@html bytesToHumanReadable(value)}
	{:else if key === 'up_limit'}
		{#if value === -1}
			<IconInfinity />
		{:else}
			{bytesToHumanReadable(value)}
		{/if}
	{:else if key === 'uploaded_session'}
		{@html bytesToHumanReadable(value)}
	{:else if key === 'uploaded'}
		{@html bytesToHumanReadable(value)}
	{:else if key === 'upspeed'}
		{@html bytesToHumanReadable(value)}/s
	{:else}
		{value}
	{/if}
{:else if typeof value === 'boolean'}
	{#if key === 'auto_tmm'}
		{value}
	{:else if key === 'f_l_piece_prio'}
		{value}
	{:else if key === 'force_start'}
		{value}
	{:else if key === 'seq_dl'}
		{value}
	{:else if key === 'super_seeding'}
		{value}
	{:else}
		{value}
	{/if}
{:else if typeof value === 'string'}
	{#if key === 'category'}
		{value}
	{:else if key === 'content_path'}
		{value}
	{:else if key === 'hash'}
		{value}
	{:else if key === 'magnet_uri'}
		{value}
	{:else if key === 'save_path'}
		{value}
	{:else if key === 'state'}
		{@html qbtStateToHumanReadable(value)}
	{:else if key === 'tags'}
		{value}
	{:else if key === 'tracker'}
		{value}
	{:else}
		{value}
	{/if}
{:else if typeof value === null || typeof value === undefined}
	n/a
{:else}
	n/a
{/if}
