const messageQueue = require("../lib/rabbitmq");
const { logger } = require("./logger");
const { rabbitMq } = require("../config/config");

const receiveMessageFromQueue = async () => {
  const connection = await messageQueue();

  /**
   * Channel
   * A channel is a one-way communication link between two queue managers and can carry messages destined for any number of queues at the remote queue manager. Each end of the channel has a separate definition. For example, if one end is a sender or a server, the other end must be a receiver or a requester.
   */
  await connection
    .createChannel()
    .then((channel) => {
      // declare queue
      const queue = rabbitMq.queue;

      // This makes sure the queue is declared before attempting to produce or consume from it
      channel.assertQueue(queue, { durable: true });

      // message needs to be in buffer
      channel.consume(
        queue,
        function (msg) {
          console.log(" [x] Received %s", msg.content.toString());
        },
        {
          // An ack(nowledgement) is sent back by the consumer to tell RabbitMQ that a particular message has been received, processed and that RabbitMQ is free to delete it.
          noAck: true,
        }
      );
    })
    .catch((err) => {
      if (err) logger.error(err);
    })
    .finally(() => {
      setTimeout(function () {
        connection.close();
      }, 500);
    });
};

receiveMessageFromQueue();

module.exports = receiveMessageFromQueue;
