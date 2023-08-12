import winston from "winston"
import { responses } from "./lib.js";

export const logger = winston.createLogger()

logger
    .add(new winston.transports.File({ filename: 'error.log', level: 'error' }))
    .add(new winston.transports.File({ filename: 'combined.log' }))

if (process.env.NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple(),
    }));
}

function responses_logging(msq) {
    logger.info(`received response ${msq.content.toString()}`)
}

responses.addListener("received", responses_logging)