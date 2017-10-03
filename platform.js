'use strict'

const Bench = require('fastbench')
const os = require('os')

console.log('Platform info:')
console.log('==============')

console.log('  ', os.type() + ' ' + os.release() + ' ' + os.arch())
console.log('  ', 'Node.JS:', process.versions.node)
console.log('  ', 'V8:', process.versions.v8)