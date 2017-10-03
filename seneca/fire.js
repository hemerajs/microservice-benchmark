'use strict'

require('../platform')

const Bench = require('fastbench')
const seneca = require('seneca')()
.use('nats-transport')
.listen({ type: 'nats' })

const run = Bench(
  [
    function benchSenecaNats(done) {
      seneca.act({ cmd: 'add', a: 5, b: 3 }, (err, res) => {
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