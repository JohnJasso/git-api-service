const express = require('express');
const api = require('./api');

const app = express();
app.use(express.json());
app.use("/api", api);
const port = process.env.PORT || 3000;

// API initial point
app.get('/', (req, res) => {
    res.send('John Jasso\'s GitHub API');
});

app.listen(port, err => {
    if(err) {
        return console.log('ERROR: ', err);
    }
    console.log(`Listening on port ${port}...`);
});