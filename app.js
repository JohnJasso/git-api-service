const express = require('express')
const exploiter = require('./exploiter')
const app = express()

// app.listen(3000, () => {
//     console.log('Listening on port 3000...');
// })

exploiter.search('tetris');