'use strict'

require('../platform')

const Bench = require('fastbench')
const { ServiceBroker } = require('moleculer')
const Transporter = require('moleculer').Transporters.NATS
const broker = new ServiceBroker({
  nodeID: 'node-1',
  transporter: new Transporter()
})

broker.start()

const run = Bench(
  [
    function benchMoleculerNats(done) {
      broker
        .call('math.add', { a: 5, b: 3 })
        .then(() => {
          done()
          return true
        })
        .catch(console.error)
    }
  ],
  10000
)

// run them two times
console.log('==============')
console.log('Wait 1 second and send 2x 10000 msg')
console.log('==============')
setTimeout(() => run(run), 1000)