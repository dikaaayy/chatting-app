// logger.js
const { createLogger, format, transports } = require('winston');
const { combine, timestamp, printf } = format;
const DailyRotateFile = require('winston-daily-rotate-file');

const logFormat = printf(({ level, message, timestamp }) => {
  return `${timestamp} ${level}: ${message}`;
});

const logger = createLogger({
  format: combine(
    timestamp(),
    logFormat
  ),
  transports: [
    new transports.Console({
      silent: process.env.NODE_ENV === 'production' // Log to console only in development
    }),
    ...(process.env.NODE_ENV === 'production' ? [new DailyRotateFile({
      filename: 'logs/chat-app-backend-%DATE%.log',
      datePattern: 'YYYY-MM-DD',
      maxFiles: '30d'
    })] : [])
  ]
});

module.exports = logger;
