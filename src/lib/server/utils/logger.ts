import { dev } from '$app/environment';
import winston, { format } from 'winston';

const logger = winston.createLogger({
	level: 'info',
	format: format.combine(
		format.timestamp(),
		format.label({ label: 'logger' }),
		winston.format.json()
	),
	defaultMeta: { service: 'web-list' },
	transports: [
		new winston.transports.File({ filename: 'error.log', level: 'error' }),
		new winston.transports.File({ filename: 'all.log' })
	]
});

if (dev) {
	logger.add(
		new winston.transports.Console({
			format: winston.format.combine(
				format.timestamp(),
				format.label({ label: 'dev mode' }),
				winston.format.prettyPrint({ colorize: true })
			)
		})
	);
}

export default logger;
