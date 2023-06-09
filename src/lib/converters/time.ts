const secondMs = 1000;
const minuteMs = 60 * secondMs;
const hourMs = 60 * minuteMs * secondMs;
const dayMs = 24 * hourMs;

const minuteSec = 60;
const hourSec = 60 * minuteSec;
const daySec = 24 * hourSec;

export const secondsToHumanReadable = (value: number) => {
	if (value > daySec) {
		return `${(value / daySec).toFixed(2)}&nbsp;d`;
	} else if (value > hourSec) {
		return `${(value / hourSec).toFixed(2)}&nbsp;h`;
	} else if (value > minuteSec) {
		return `${(value / minuteSec).toFixed(2)}&nbsp;m`;
	} else {
		return `${value}&nbsp;s`;
	}
};

export const msToHumanReadable = (value: number) => {
	if (value > dayMs) {
		return `${(value / dayMs).toFixed(2)}&nbsp;d`;
	} else if (value > hourMs) {
		return `${(value / hourMs).toFixed(2)}&nbsp;h`;
	} else if (value > minuteMs) {
		return `${(value / minuteMs).toFixed(2)}&nbsp;m`;
	} else {
		return `${value}&nbsp;ms`;
	}
};
