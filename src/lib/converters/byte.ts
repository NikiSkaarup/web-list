const GiB = 1073741824;
const MiB = 1048576;
const KiB = 1024;

export const bytesToHumanReadable = (value: number) => {
	if (value > GiB) {
		return `${(value / GiB).toFixed(2)}&nbsp;GiB`;
	} else if (value > MiB) {
		return `${(value / MiB).toFixed(2)}&nbsp;MiB`;
	} else if (value > KiB) {
		return `${(value / KiB).toFixed(2)}&nbsp;KiB`;
	} else {
		return `${value}&nbsp;B`;
	}
};
