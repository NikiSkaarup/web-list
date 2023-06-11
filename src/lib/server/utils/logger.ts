import { dev } from '$app/environment';
import winston, { format } from 'winston';

const levels: Record<string, Record<string, number>> = {
	syslog: {
		emerg: 0,
		alert: 1,
		crit: 2,
		error: 3,
		warning: 4,
		notice: 5,
		info: 6,
		debug: 7
	},
	npm_logging: {
		error: 0,
		warn: 1,
		info: 2,
		http: 3,
		verbose: 4,
		debug: 5,
		silly: 6
	}
};

const logger = winston.createLogger({
	level: 'debug',
	levels: levels.syslog,
	format: format.combine(
		format.timestamp(),
		// format.label({ label: 'logger' }),
		winston.format.json()
	),
	// defaultMeta: { service: 'web-list' },
	transports: [new winston.transports.File({ filename: 'logs.log' })]
});

const devTransport = new winston.transports.Console({
	level: 'debug',
	format: winston.format.combine(
		// format.timestamp(),
		// format.label({ label: 'dev' }),
		// winston.format.padLevels({
		// 	levels: levels.syslog
		// }),
		winston.format.prettyPrint({ colorize: true })
	)
});

if (dev) {
	logger.add(devTransport);
}

export default logger;
