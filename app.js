const express = require('express')
const exploiter = require('./exploiter')
const app = express()
const port = process.env.PORT || 3000;

// API initial point
app.get('/', (req, res) => {
    res.send('John Jasso\'s GitHub API');
});

// End-point for searching repositories
app.get('/api/search-repo', async (req, res) => {
    try {
        const response = await exploiter.search(req.query.term);
        res.send(response);
    } catch(error) {
        res.send(error);
    }
    // console.log(req.query);
    // res.send(req.query);
})

// End-point for listing all bookmarks
app.get("/api/bookmarks", async (req, res) => {
  try {
    const response = await exploiter.list();
    res.send(response);
  } catch (error) {
    res.send(error);
  }
});

app.listen(port, () => {
    console.log(`Listening on port ${port}...`);
})

// exploiter.search('tetris');
// exploiter.list();
// exploiter.starAuth(178619111);
// exploiter.listAuth();
// exploiter.remStarAuth(76954504);