import pino from 'pino';

const isDev = process.env.NODE_ENV === 'development';

export const logger = isDev 
  ? pino({
      level: process.env.LOG_LEVEL || 'info',
    }, 
    // Use pino-pretty as a stream in dev to avoid worker thread issues in Next.js
    require('pino-pretty')({
      colorize: true,
      translateTime: 'HH:MM:ss Z',
      ignore: 'pid,hostname',
      singleLine: false,
    }))
  : pino({
      level: process.env.LOG_LEVEL || 'info',
    });
