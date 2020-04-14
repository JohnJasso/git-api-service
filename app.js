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
    if(!req.query) {
        res.status(400).send('A search query should be included');
    } else if (!req.query.term) {
        res.status(400).send("The query should be defined by ?term=");
    } else {
        try {
            const response = await exploiter.search(req.query.term);
            if (!response)
                res.status(400).send("Not found");
            else
                res.status(200).send(response);
        } catch(error) {
            res.send(error);
        }
    }
    // console.log(req.query);
    // res.send(req.query);
})

// End-point for listing all bookmarks
app.get("/api/bookmarks", async (req, res) => {
  try {
    const response = await exploiter.list();
    if(!response)
        res.status(400).send('Not found');
    else
        res.status(200).send(response);
  } catch (error) {
      res.send(error);
  }
});

// End-point for bookmarking a repository
app.put("/api/bookmark-repo/:id", async (req, res) => {
  try {
    const repo = await exploiter.searchID(req.params.id);
    const response = await exploiter.starAuth(req.params.id);
    if(!response)
        res.status(400).send('Not found');
    else {
        const body = {
            message: 'Bookmarked repository',
            repository: repo
        }
        res.status(200).send(body);
    }
  } catch (error) {
      res.send(error);
  }
});

// End-point for removing a bookmark from a repository
app.delete("/api/bookmark-remove/:id", async (req, res) => {
  try {
    const repo = await exploiter.searchID(req.params.id);
    const response = await exploiter.remStarAuth(req.params.id);
    if (!response)
        res.status(400).send("Not found");
    else {
        const body = {
          message: "Removed bookmark",
          repository: repo,
        };
        res.status(200).send(body);
    }
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