'use strict'

require('../platform')

const Bench = require('fastbench')
const Hemera = require('nats-hemera')
const nats = require('nats').connect()
const hemera = new Hemera(nats, { logLevel: 'error', name: 'node-1' })

hemera.ready()

const run = Bench(
  [
    function benchHemera(done) {
      hemera.act({ topic: 'math', cmd: 'add', a: 5, b: 3 }, (err, res) => {
        if (err) console.error(err)
        done()
      })
    }
  ],
  10000
)

// run them two times
console.log('==============')
console.log('Wait 1 second and send 2x 10000 msg')
console.log('==============')
setTimeout(() => run(run), 1000)