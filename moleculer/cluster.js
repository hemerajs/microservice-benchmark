'use strict'

const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const { ServiceBroker } = require('moleculer')
const Transporter = require('moleculer').Transporters.NATS

if (cluster.isMaster) {
  console.log(`Master ${process.pid} is running`)

  // Fork workers.
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`)
  })
} else {
  const broker = new ServiceBroker({
    nodeID: 'node-' + process.pid,
    transporter: new Transporter()
  })

  broker.createService({
    name: 'math',
    actions: {
      add({ params }) {
        return params.a + params.b
      }
    }
  })

  broker.start()
  console.log(`Worker ${process.pid} started`)
}
