# 🌀 Microservice Framework Benchmark
This is a simple benchmark for microservice frameworks in Node.Js which support NATS as transport.

## Install

```
$ npm install
```

## Run NATS

https://nats.io/documentation/tutorials/gnatsd-install

## Frameworks

- Hemera 5.0.1
- Seneca 3.4.3
- Moleculer 0.12.1

## Run simple test
- Start one consumer
- Send 1000 msg for 2 rounds from one producer

```
$ npm run simple
```

### Result
```
Platform info:
==============
   Windows_NT 10.0.16299 x64
   Node.JS: 8.9.0
   V8: 6.1.534.46
   Intel(R) Core(TM) i5-6600K CPU @ 3.50GHz × 4
==============
Wait 1 second and send 2x 1000 msg
==============
benchHemera*1000: 250.641ms
benchMoleculerNats*1000: 433.571ms
benchHemera*1000: 201.187ms
benchMoleculerNats*1000: 355.256ms
benchSenecaNats FAILED
```

## Run complex test

- Start x (cpu count) consumer in seperate child processes
- Send 10000 messages for 2 rounds from one producer

```
$ node ./hemera/cluster.js
$ node ./hemera/fire.js

$ node ./moleculer/cluster.js
$ node ./moleculer/fire.js

$ node ./seneca/cluster.js
$ node ./seneca/fire.js
```

### Result
```
Platform info:
==============
   Windows_NT 10.0.16299 x64
   Node.JS: 8.9.0
   V8: 6.1.534.46
   Intel(R) Core(TM) i5-6600K CPU @ 3.50GHz × 4
==============
benchHemera*10000: 1801.420ms
benchHemera*10000: 1591.466ms
benchMoleculerNats*10000: 3848.300ms
benchMoleculerNats*10000: 3511.714ms
benchSenecaNats FAILED
```

## TODO

- [ ] Start multiple producer and bench
- [ ] Bench consuming
