const express = require('express')
const axios = require('axios')

const app = express();

app.get('/', (req, res) => {
    axios.get('https://httpbin.org/delay/2')
    .then(axios.get('https://httpbin.org/uuid')
            .then(response => res.send(response.data)));
});

app.listen(3000, () => {
    console.log('Starting Node.js server at port 3000')
})