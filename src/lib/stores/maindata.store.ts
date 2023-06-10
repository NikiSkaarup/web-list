import { writable, type Writable } from 'svelte/store';

export let syncing = writable(false);
export let pauseSync = writable(false);
let _pauseSync: boolean = false;
pauseSync.subscribe((value) => {
	_pauseSync = value;
});

export let torrents: Writable<Array<QbtTorrent>> = writable([]);
export let categories: Writable<Array<QbtSyncMainDataCategory>> = writable([]);

export let maindata: Writable<QbtSyncMainData | null> = writable(null);
let _maindata: QbtSyncMainData | null = null;
maindata.subscribe((value) => {
	_maindata = value;
	if (value === null) return;

	const trackers = Object.entries(value.trackers ?? {});
	const getTrackers = (hash: QbtHash) => trackers.filter(([_, hashes]) => hashes.includes(hash));

	const torrentsToSet = Object.entries(value.torrents).map(([hash, torrent]) => {
		torrent.hash = hash;

		const trackers = getTrackers(hash);

		if (trackers.length > 0) {
			torrent.tracker = trackers[0][0];
		}

		return torrent;
	});
	torrents.set(torrentsToSet);

	categories.set(Object.values(value.categories));
});

export let url: Writable<string | undefined> = writable(undefined);
let _url: string | undefined = undefined;
url.subscribe((value) => {
	_url = value;
});

const handleCategories = (
	items: QbtSyncMainData['categories'],
	added: QbtSyncMainData['categories'] | undefined,
	removed: QbtSyncMainData['categories_removed'] | undefined
) => {
	removed?.forEach((name) => {
		delete items[name];
	});

	if (added === undefined) return items;

	const newItems = Object.entries(added).map(([name, category]) => [name, category]);

	const currentItems = Object.entries(items).map(([name, category]) => [name, category]);

	return Object.fromEntries([...currentItems, ...newItems]);
};

const handleTorrents = (
	items: QbtSyncMainData['torrents'],
	added: QbtSyncMainData['torrents'] | undefined,
	removed: QbtSyncMainData['torrents_removed'] | undefined
) => {
	removed?.forEach((name) => {
		delete items[name];
	});

	if (added === undefined) return items;

	const newItems = Object.entries(added).map(([hash, torrent]) => [
		hash,
		{
			...torrent,
			hash
		}
	]);

	const currentItems = Object.entries(items).map(([hash, torrent]) => [
		hash,
		{
			...torrent,
			hash
		}
	]);

	return Object.fromEntries([...currentItems, ...newItems]);
};

const handleTrackers = (
	items: QbtSyncMainData['trackers'],
	added: QbtSyncMainData['trackers'] | undefined,
	torrents: QbtSyncMainData['torrents']
) => {
	const purged = Object.entries(items)
		.map(([url, hashes]) => {
			const filteredHashes = hashes.filter((hash) => torrents[hash] !== undefined);
			return [url, filteredHashes] as [string, Array<string>];
		})
		.filter(([_, hashes]) => hashes.length > 0);

	if (added === undefined) return Object.fromEntries(purged) as QbtSyncMainData['trackers'];

	const newItems = Object.entries(added).map(
		([url, hashes]) => [url, hashes] as [string, Array<string>]
	);

	const currentItemsMap = new Map<string, Array<string>>(purged);

	for (const [url, hashes] of newItems) {
		const currentHashes = currentItemsMap.get(url);
		if (currentHashes !== undefined) {
			currentHashes.push(...hashes);
		} else {
			currentItemsMap.set(url, hashes);
		}
	}

	return Object.fromEntries(currentItemsMap.entries());
};

const ifDifferent = <T>(current: T, newValue: T | undefined) => {
	if (newValue === undefined) return current as T;
	if (current !== newValue) return newValue as T;
	return current as T;
};

const handleServerState = (state: QbtServerState, inc: QbtServerState) => {
	state.alltime_dl = ifDifferent(state.alltime_dl, inc.alltime_dl);
	state.alltime_ul = ifDifferent(state.alltime_ul, inc.alltime_ul);
	state.average_time_queue = ifDifferent(state.average_time_queue, inc.average_time_queue);
	state.connection_status = ifDifferent(state.connection_status, inc.connection_status);
	state.dht_nodes = ifDifferent(state.dht_nodes, inc.dht_nodes);
	state.dl_info_data = ifDifferent(state.dl_info_data, inc.dl_info_data);
	state.dl_info_speed = ifDifferent(state.dl_info_speed, inc.dl_info_speed);
	state.dl_rate_limit = ifDifferent(state.dl_rate_limit, inc.dl_rate_limit);
	state.free_space_on_disk = ifDifferent(state.free_space_on_disk, inc.free_space_on_disk);
	state.global_ratio = ifDifferent(state.global_ratio, inc.global_ratio);
	state.queued_io_jobs = ifDifferent(state.queued_io_jobs, inc.queued_io_jobs);
	state.queueing = ifDifferent(state.queueing, inc.queueing);
	state.read_cache_hits = ifDifferent(state.read_cache_hits, inc.read_cache_hits);
	state.read_cache_overload = ifDifferent(state.read_cache_overload, inc.read_cache_overload);
	state.refresh_interval = ifDifferent(state.refresh_interval, inc.refresh_interval);
	state.total_buffers_size = ifDifferent(state.total_buffers_size, inc.total_buffers_size);
	state.total_peer_connections = ifDifferent(
		state.total_peer_connections,
		inc.total_peer_connections
	);
	state.total_queued_size = ifDifferent(state.total_queued_size, inc.total_queued_size);
	state.total_wasted_session = ifDifferent(state.total_wasted_session, inc.total_wasted_session);
	state.up_info_data = ifDifferent(state.up_info_data, inc.up_info_data);
	state.up_info_speed = ifDifferent(state.up_info_speed, inc.up_info_speed);
	state.up_rate_limit = ifDifferent(state.up_rate_limit, inc.up_rate_limit);
	state.use_alt_speed_limits = ifDifferent(state.use_alt_speed_limits, inc.use_alt_speed_limits);
	state.write_cache_overload = ifDifferent(state.write_cache_overload, inc.write_cache_overload);

	return state;
};

export let sync = (data: QbtSyncMainData) => {
	if (data.full_update) {
		maindata.set(data);
		return;
	}

	maindata.update((current) => {
		if (current === null) return data;

		const backup = structuredClone(current);
		try {
			current.categories = handleCategories(
				current.categories,
				data.categories,
				data.categories_removed
			);

			current.torrents = handleTorrents(
				current.torrents,
				data.torrents,
				data.torrents_removed
			);

			handleTrackers(current.trackers, data.trackers, current.torrents);

			current.server_state = handleServerState(current.server_state, data.server_state);

			current.rid = data.rid;

			return current;
		} catch (e) {
			console.error(e);
			return backup;
		}
	});
};

let _running = false;
let _syncInterval: NodeJS.Timer | string | number | undefined | null = null;
let _syncIntervalMs = 5000;

export let syncInterval: Writable<number> = writable(_syncIntervalMs);

export let startSync = () => {
	if (_syncInterval !== null) return;
	_syncInterval = setInterval(async () => {
		if (_pauseSync) return;
		if (_running || _url === undefined) return;
		_running = true;

		try {
			let input = `${_url}/api/qbt/v2/maindata/`;
			if (_maindata === null) {
				input += '0';
			} else {
				input += _maindata.rid;
			}

			const response = await fetch(input);
			const data: QbtSyncMainData = await response.json();
			sync(data);
		} finally {
			_running = false;
		}
	}, _syncIntervalMs);
	syncing.set(true);
};

export let stopSync = () => {
	if (_syncInterval === null) return;
	clearInterval(_syncInterval);
	_syncInterval = null;
	syncing.set(false);
};

syncInterval.subscribe((value) => {
	_syncIntervalMs = value;
	if (_syncInterval === null) return;
	stopSync();
	startSync();
});
