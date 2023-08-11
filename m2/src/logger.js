import winston from "winston"

export const logger = winston.createLogger()

logger
    .add(new winston.transports.File({ filename: 'error.log', level: 'error' }))
    .add(new winston.transports.File({ filename: 'combined.log' }))

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}
