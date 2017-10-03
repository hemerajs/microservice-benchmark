# Microservice Framework Benchmark
This is a simple benchmark for microservice frameworks which support NATS as transport.

## Run

```
$ npm install
$ npm run simple
```

## Run NATS

https://nats.io/documentation/tutorials/gnatsd-install

## Frameworks

- Hemera
- Seneca
- Moleculer

## Result

```
Platform info:
==============
   Windows_NT 10.0.15063 x64
   Node.JS: 8.4.0
   V8: 6.0.286.52
==============
Wait 1 second and send 2x 1000 msg
==============
benchSenecaNats*1000: 490.746ms
benchHemera*1000: 310.382ms
benchMoleculerNats*1000: 1371.028ms
benchSenecaNats*1000: 404.128ms
benchHemera*1000: 257.626ms
benchMoleculerNats*1000: 1309.244ms
```