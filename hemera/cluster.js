'use strict'

const cluster = require('cluster')
const numCPUs = require('os').cpus().length

const Hemera = require('nats-hemera')
const nats = require('nats').connect()

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
  const hemera = new Hemera(nats, { logLevel: 'error', name: 'node-' + process.pid })
  
  hemera.ready(() => {
    hemera.add({ topic: 'math', cmd: 'add' }, (resp, cb) => {
      cb(null, resp.a + resp.b)
    })
  })

  console.log(`Worker ${process.pid} started`)
}
