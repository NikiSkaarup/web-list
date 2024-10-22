import { configure, getAnsiColorFormatter, getConsoleSink, getLogger } from "@logtape/logtape";

await configure({
	sinks: { console: getConsoleSink({ formatter: getAnsiColorFormatter() }) },
	loggers: [
		{ category: ['web-list'], level: process.env.DEVELOPMENT === 'true' ? 'debug' : 'info', sinks: ['console'] },
		{ category: ['logtape', 'meta'], level: 'fatal', sinks: ['console'] },
	],
});

const log = getLogger(['web-list']);

export default log;
