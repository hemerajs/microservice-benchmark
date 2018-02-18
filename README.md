# 🌀 Microservice Framework Benchmark
This is a simple benchmark for microservice frameworks in Node.Js which support NATS as transport.

## Install

```
$ npm install
```

## Run NATS

https://nats.io/documentation/tutorials/gnatsd-install

## Frameworks

- Hemera 3.1.9
- Seneca 3.4.3
- Moleculer 0.11.10

## Run simple test
- Send 1000 msg for 2 rounds

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
benchHemera*1000: 299.032ms
benchHemera*1000: 224.414ms
benchMoleculerNats*1000: 402.865ms
benchMoleculerNats*1000: 335.870ms
benchSenecaNats FAILED
```

## Run complex test

- start x (cpu count) child processes
- Send 10000 messages for 2 rounds

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
   Windows_NT 10.0.15063 x64
   Node.JS: 8.4.0
   V8: 6.0.286.52
   Intel(R) Core(TM) i5-6600K CPU @ 3.50GHz × 4
==============
benchHemera*10000: 2606.231ms
benchHemera*10000: 2080.486ms
benchMoleculerNats*10000: 4334.958ms
benchMoleculerNats*10000: 3649.779ms
benchSenecaNats FAILED
```

## TODO

- [ ] Start multiple producer and bench
- [ ] Bench consuming
