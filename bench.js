'use strict'

const Bench = require('fastbench')
const os = require('os')

console.log('Platform info:')
console.log('==============')

console.log('  ', os.type() + ' ' + os.release() + ' ' + os.arch())
console.log('  ', 'Node.JS:', process.versions.node)
console.log('  ', 'V8:', process.versions.v8)

/**
 * Hemera
 */
const Hemera = require('nats-hemera')
const nats = require('nats').connect()

const hemera1 = new Hemera(nats, { logLevel: 'error', name: 'node-1' })
const hemera2 = new Hemera(nats, { logLevel: 'error', name: 'node-2' })

hemera2.ready(() => {
  hemera2.add({ topic: 'math', cmd: 'add' }, (resp, cb) => {
    cb(null, resp.a + resp.b)
  })
})

/**
 * Moleculer
 */
const { ServiceBroker } = require('moleculer')
const Transporter = require('moleculer').Transporters.NATS
const broker1 = new ServiceBroker({
  nodeID: 'node-1',
  transporter: new Transporter()
})
const broker2 = new ServiceBroker({
  nodeID: 'node-2',
  transporter: new Transporter()
})

broker2.createService({
  name: 'math',
  actions: {
    add({ params }) {
      return params.a + params.b
    }
  }
})

broker1.start()
broker2.start()

/**
 * Seneca
 */
const seneca1 = require('seneca')()
  .use('nats-transport')
  .client({ type: 'nats' })

const seneca2 = require('seneca')()
  .use('nats-transport')
  .add({ cmd: 'add' }, (msg, done) => {
    done(null, { res: msg.a + msg.b })
  })
  .listen({ type: 'nats' })

const run = Bench(
  [
    function benchSenecaNats(done) {
      seneca1.act({ cmd: 'add', a: 5, b: 3 }, (err, res) => {
        if (err) console.error(err)
        done()
      })
    },
    function benchHemera(done) {
      hemera1.act({ topic: 'math', cmd: 'add', a: 5, b: 3 }, (err, res) => {
        if (err) console.error(err)
        done()
      })
    },
    function benchMoleculerNats(done) {
      broker1
        .call('math.add', { a: 5, b: 3 })
        .then(() => {
          done()
          return true
        })
        .catch(console.error)
    }
  ],
  1000
)

// run them two times
console.log('==============')
console.log('Wait 1 second and send 2x 1000 msg')
console.log('==============')
setTimeout(() => run(run), 1000)
