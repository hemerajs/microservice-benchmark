# Microservice Framework Benchmark
This is a benchmark for microservice frameworks which support NATS as transport.

## Install

```
$ npm install
```

## Run NATS

https://nats.io/documentation/tutorials/gnatsd-install

## Frameworks

- Hemera
- Seneca
- Moleculer

## Run simple test
- Send 1000 msg for 2 rounds

```
$ npm run simple
```

### Result
```
Platform info:
==============
   Windows_NT 10.0.15063 x64
   Node.JS: 8.4.0
   V8: 6.0.286.52
==============
benchSenecaNats*1000: 490.746ms
benchHemera*1000: 310.382ms
benchMoleculerNats*1000: 1371.028ms
benchSenecaNats*1000: 404.128ms
benchHemera*1000: 257.626ms
benchMoleculerNats*1000: 1309.244ms
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
==============
benchMoleculerNats*10000: 11169.327ms
benchMoleculerNats*10000: 10594.909ms
benchHemera*10000: 2669.848ms
benchHemera*10000: 2069.004ms
benchSenecaNats FAILED
```