const tracing = require('@opencensus/nodejs')
const propagation = require('@opencensus/propagation-b3')
const jaeger = require('@opencensus/exporter-jaeger')
const b3 = new propagation.B3Format()

const jaegerOptions = {
  serviceName: 'node-jaeger-bcbk9',
  host: 'localhost',
  port: 6832,
}

tracing.start({
    propagation: b3,
    exporter: new jaeger.JaegerTraceExporter(jaegerOptions)
})

const express = require('express')
const axios = require('axios')
const app = express()

app.get('/', (req, res) => {
    axios.get('https://httpbin.org/delay/2')
    .then(axios.get('https://httpbin.org/anything')
            .then(response => res.json(response.data)))
})

app.listen(3000, () => {
    console.log('Starting Node.js server at port 3000')
})