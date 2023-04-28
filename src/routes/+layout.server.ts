const perf = (requestStart: number) => {
	return performance.now() - requestStart;
};

export const load = async (event) => {
	return {
		layoutDuration: perf(event.locals.requestStart),
		blahs: []
	};
};
