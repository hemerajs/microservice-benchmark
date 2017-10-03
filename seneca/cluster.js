'use strict'

const seneca = require('seneca')
const cluster = require('cluster')
const numCPUs = require('os').cpus().length

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
  seneca()
    .use('nats-transport')
    .add({ cmd: 'add' }, (msg, done) => {
      done(null, { res: msg.a + msg.b })
    })
    .listen({ type: 'nats' })

  console.log(`Worker ${process.pid} started`)
}
