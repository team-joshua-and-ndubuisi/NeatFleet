import { createLogger, format, transports } from 'winston';
const { combine, timestamp, printf } = format;

const printFormat = printf(({ level, message, timestamp, ...rest }) => {
  const metadata = Object.keys(rest).length ? JSON.stringify(rest) : '';
  return `${timestamp} ${level}: ${message} ${metadata}`;
});

const logger = createLogger({
  level: 'info',
  format: combine(timestamp(), printFormat),
  transports: [
    new transports.File({ filename: 'error.log', level: 'error' }),
    new transports.File({ filename: 'combined.log' }),
  ],
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(
    new transports.Console({
      format: combine(timestamp(), printFormat),
    })
  );
}

export { logger };
