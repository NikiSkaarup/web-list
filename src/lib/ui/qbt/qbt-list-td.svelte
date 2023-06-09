<script lang="ts">
	import { ProgressBar } from '@skeletonlabs/skeleton';
	import QbtTorrentFormatter from './qbt-torrent-formatter.svelte';

	export let key: QbtTorrentsInfoSort;
	export let value: string | number | boolean | QbtHash;

	const title = typeof value === 'string' ? value : value.toString();
</script>

{#if key === 'added_on'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'amount_left'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'auto_tmm'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'availability'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'category'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<span class="overflow-hidden text-ellipsis inline-block max-w-[10rem]">
			<QbtTorrentFormatter {key} {value} />
		</span>
	</td>
{:else if key === 'completed'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'completion_on'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'content_path'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<span class="overflow-hidden text-ellipsis inline-block max-w-[10rem]">
			<QbtTorrentFormatter {key} {value} />
		</span>
	</td>
{:else if key === 'dl_limit'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'dlspeed'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'downloaded_session'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'downloaded'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'eta'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'f_l_piece_prio'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'force_start'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'hash'}
	<td class="table-cell-fit font-mono" {title}>
		<span class="overflow-hidden text-ellipsis inline-block whitespace-nowrap max-w-[10rem]">
			<QbtTorrentFormatter {key} {value} />
		</span>
	</td>
{:else if key === 'last_activity'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'magnet_uri'}
	<td class="table-cell-fit font-mono" {title}>
		<span class="overflow-hidden text-ellipsis inline-block whitespace-nowrap max-w-[10rem]">
			<QbtTorrentFormatter {key} {value} />
		</span>
	</td>
{:else if key === 'max_ratio'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'max_seeding_time'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'name'}
	<td class="table-cell-fit font-mono" {title}>
		<span class="overflow-hidden text-ellipsis inline-block whitespace-nowrap max-w-[20rem]">
			<QbtTorrentFormatter {key} {value} />
		</span>
	</td>
{:else if key === 'num_complete'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'num_incomplete'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'num_leechs'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'num_seeds'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'priority'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'progress'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<div>
			<QbtTorrentFormatter {key} {value} />
			<ProgressBar meter="bg-secondary-500" value={Number(value) * 100} />
		</div>
	</td>
{:else if key === 'ratio_limit'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'ratio'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'save_path'}
	<td class="table-cell-fit font-mono" {title}>
		<span class="overflow-hidden text-ellipsis inline-block whitespace-nowrap max-w-[10rem]">
			<QbtTorrentFormatter {key} {value} />
		</span>
	</td>
{:else if key === 'seeding_time_limit'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'seeding_time'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'seen_complete'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'seq_dl'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'size'}
	<td class="table-cell-fit font-mono whitespace-nowrap break-keep" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'state'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'super_seeding'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'tags'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<span class="overflow-hidden text-ellipsis inline-block max-w-[10rem]">
			<QbtTorrentFormatter {key} {value} />
		</span>
	</td>
{:else if key === 'time_active'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'total_size'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'tracker'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<span class="overflow-hidden text-ellipsis inline-block max-w-[10rem]">
			<QbtTorrentFormatter {key} {value} />
		</span>
	</td>
{:else if key === 'up_limit'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'uploaded_session'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'uploaded'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else if key === 'upspeed'}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<QbtTorrentFormatter {key} {value} />
	</td>
{:else}
	<td class="table-cell-fit font-mono whitespace-nowrap" {title}>
		<span class="overflow-hidden text-ellipsis inline-block max-w-[10rem]">
			<QbtTorrentFormatter {key} {value} />
		</span>
	</td>
{/if}
