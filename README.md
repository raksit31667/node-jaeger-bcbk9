# Nodejs Jaeger @ Barcamp Bangken 9
Barcamp Bangkhen #9 - Microservice Tracing with Jaeger hosted by [whs](https://github.com/whs)

## Today I learned  :mag:
- We should not expose too much error to users, otherwise they might see software's vulnerabilities and eventually hack us.
- Tracing enables developers to see end-to-end flow of response time, database access, outgoing API calls, and templating.
- Speaker has ever used Sentry as tracer with email notification, but it was tiring.
- According to speaker's research, gRPC has better performance than RESTful Web service.
- Jaeger is distributed tracing system by Uber hosted in CNCF (home of K8S, Prometheus).
- With using OpenTracing, Opencensus + instrumention -> no additional code needed.
- B3 format is one of propagations used to send trace into services.

## Demo (Locally)  :rocket:

- Install Jaeger by running pre-built Jaeger Docker image with this command line:

```
docker run -d --name jaeger \
  -e COLLECTOR_ZIPKIN_HTTP_PORT=9411 \
  -p 5775:5775/udp \
  -p 6831:6831/udp \
  -p 6832:6832/udp \
  -p 5778:5778 \
  -p 16686:16686 \
  -p 14268:14268 \
  -p 9411:9411 \
  jaegertracing/all-in-one:1.8
```

- Install Opencensus dependencies into package.json:

```
npm i @opencensus/exporter-jaeger @opencensus/nodejs @opencensus/propagation-b3
```

- Add these lines into your main file (default should be `index.js`)

```
const tracing = require('@opencensus/nodejs')
const propagation = require('@opencensus/propagation-b3')
const jaeger = require('@opencensus/exporter-jaeger')
const b3 = new propagation.B3Format()

const jaegerOptions = {
  serviceName: '<your-service-name>',
  host: 'localhost',
  port: 6832, // one of Jaeger agent port (not your application port)
}

tracing.start({
    propagation: b3,
    exporter: new jaeger.JaegerTraceExporter(jaegerOptions)
})
```

- Open `localhost:16686`, select your service and click `Find Traces`.

![Imgur](https://i.imgur.com/BntdBIr.png)

- You can explore traces, response time, and more.

![Imgur](https://i.imgur.com/ovmWAED.png)
![Imgur](https://i.imgur.com/dPGaTkl.png)


## Slide :chart_with_upwards_trend:
https://speakerdeck.com/whs/tiiaeph-microservice-dwy-tracing

### Credits: [whs](https://github.com/whs)
