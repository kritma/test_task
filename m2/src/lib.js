import { connect } from 'amqplib';

const RABBITMQ_URL = process.env.RABBITMQ ?? 'amqp://localhost';
const TASK_QUEUE = process.env.TASK_QUEUE ?? 'tasks';
const RESPONSE_QUEUE = process.env.RESPONSE_QUEUE ?? 'results';

async function setupRabbitMQ() {
    const connection = await connect(RABBITMQ_URL)
    const channel = await connection.createChannel()
    await channel.assertQueue(TASK_QUEUE, { durable: true })
    await channel.assertQueue(RESPONSE_QUEUE, { durable: true })
    return channel;
}

const channel = await setupRabbitMQ()

export function handleTasks(handler) {
    channel.consume(TASK_QUEUE, (msg) => {
        const response = handler(JSON.parse(msg.content.toString()))
        channel.sendToQueue(RESPONSE_QUEUE, Buffer.from(JSON.stringify(response)), {
            persistent: true,
            correlationId: msg.properties.correlationId,
        });
    }, { noAck: true })
}