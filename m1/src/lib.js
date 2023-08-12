import { connect } from 'amqplib';
import { randomUUID } from 'crypto';
import EventEmitter from 'events';

const RABBITMQ = `amqp://${process.env.RABBITMQ ?? 'localhost'}`
const TASK_QUEUE = process.env.TASK_QUEUE ?? 'tasks'
const RESPONSE_QUEUE = process.env.RESPONSE_QUEUE ?? 'results'

export const responses = new EventEmitter()

async function setupRabbitMQ() {
    const connection = await connect(RABBITMQ)
    const channel = await connection.createChannel()
    await channel.assertQueue(TASK_QUEUE, { durable: true })
    await channel.assertQueue(RESPONSE_QUEUE, { durable: true })
    channel.prefetch(1)
    channel.consume(RESPONSE_QUEUE, (msg) => {
        responses.emit("received", msg)
    })
    return channel
}

const channel = await setupRabbitMQ()

export async function processTask(task) {
    const correlationId = randomUUID()

    channel.sendToQueue(TASK_QUEUE, Buffer.from(JSON.stringify(task)), {
        persistent: true,
        correlationId,
    });

    return new Promise((resolve, reject) => {
        const received_handler = (msg) => {
            if (msg.properties.correlationId == correlationId) {
                channel.ack(msg)
                responses.removeListener("received", received_handler)
                const obj = JSON.parse(msg.content.toString())
                resolve(obj)
            }
        }
        responses.addListener("received", received_handler)
    })
}
