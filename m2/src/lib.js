import { connect } from 'amqplib';
import { logger } from "./logger.js";

const RABBITMQ = `amqp://${process.env.RABBITMQ ?? 'localhost'}`
const TASK_QUEUE = process.env.TASK_QUEUE ?? 'tasks'
const RESPONSE_QUEUE = process.env.RESPONSE_QUEUE ?? 'results'

async function setupRabbitMQ() {
    const connection = await connect(RABBITMQ)
    const channel = await connection.createChannel()
    await channel.assertQueue(TASK_QUEUE, { durable: true })
    await channel.assertQueue(RESPONSE_QUEUE, { durable: true })
    return channel;
}

const channel = await setupRabbitMQ()

export function handleTasks(handler) {
    channel.consume(TASK_QUEUE, async (msg) => {
        logger.info(`received task ${msg.content.toString()}`);
        const response = await handler(JSON.parse(msg.content.toString()))
        channel.ack(msg)
        channel.sendToQueue(RESPONSE_QUEUE, Buffer.from(JSON.stringify(response)), {
            correlationId: msg.properties.correlationId,
        });
    })
}