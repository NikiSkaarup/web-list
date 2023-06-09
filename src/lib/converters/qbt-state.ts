export const qbtStateToHumanReadable = (value: QbtTorrentState | string) => {
	switch (value) {
		case 'error':
			return 'error';
		case 'uploading':
			return 'uploading';
		case 'pausedUP':
			return 'paused';
		case 'queuedUP':
			return 'upload&nbsp;queued';
		case 'stalledUP':
			return 'upload&nbsp;stalled';
		case 'checkingUP':
			return 'upload&nbsp;checking';
		case 'forcedUP':
			return 'upload&nbsp;forced';
		case 'allocating':
			return 'allocating';
		case 'downloading':
			return 'downloading';
		case 'metaDL':
			return 'downloading&nbsp;metadata';
		case 'pausedDL':
			return 'paused';
		case 'queuedDL':
			return 'download&nbsp;queued';
		case 'stalledDL':
			return 'download&nbsp;stalled';
		case 'checkingDL':
			return 'download&nbsp;checking';
		case 'forcedDL':
			return 'download&nbsp;forced';
		case 'checkingResumeData':
			return 'checking&nbsp;resume&nbsp;data';
		case 'moving':
			return 'moving';
		case 'unknown':
		default:
			return 'unknown';
	}
};
