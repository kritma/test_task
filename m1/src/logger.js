import winston from "winston"
import { messages } from "./lib.js";

export const logger = winston.createLogger()

logger
    .add(new winston.transports.File({ filename: 'error.log', level: 'error' }))
    .add(new winston.transports.File({ filename: 'combined.log' }))

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

function log_rabitmq(msq) {
    logger.info(`received message ${msq.content.toString()}`)
}

messages.addListener("received", log_rabitmq)