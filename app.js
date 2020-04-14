const express = require('express')
const exploiter = require('./exploiter')
const validation = require('./validation')

const app = express()
const port = process.env.PORT || 3000;

// API initial point
app.get('/', (req, res) => {
    res.send('John Jasso\'s GitHub API');
});

// End-point for searching repositories
app.get('/api/search-repo', async (req, res) => {
    const { error } = validation.validateSearch(req.query);
    if(error) {
        return res.status(400).send('A search query should be included and defined as \"?term=[searchquery]\"');
    } else {
        try {
            const response = await exploiter.search(req.query.term);
            if (!response) res.status(400).send("Not found");
            else res.status(200).send(response);
        } catch (error) {
            console.log("ERROR: ", error);
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
        if (!response) res.status(400).send("Not found");
        else res.status(200).send(response);
    } catch (error) {
        console.log("ERROR: ", error);
        res.send(error);
    }
});

// End-point for bookmarking a repository
app.put("/api/bookmark-repo/:id", async (req, res) => {
    const { error } = validation.validateID(req.params);
    if(error) {
        return res.status(400).send(error.details[0].message);
    } else {
        const repo = await exploiter.searchID(req.params.id);
        if (!repo.id) {
          res.status(404).send("Repository Not found");
        } else {
          try {
              await exploiter.starAuth(req.params.id);
              const body = {
                  message: "Bookmarked repository",
                  repository: repo,
              };
              res.status(200).send(body);
          } catch (error) {
              console.log("ERROR: ", error);
              res.send(error);
          }
        }
    }
});

// End-point for removing a bookmark from a repository
app.delete("/api/bookmark-remove/:id", async (req, res) => {
    const { error } = validation.validateID(req.params);
    if(error) {
        return res.status(400).send(error.details[0].message);
    } else {
        const repo = await exploiter.searchID(req.params.id);
        if (!repo.id) {
          res.status(404).send("Repository Not found");
        } else {
          try {
              await exploiter.remStarAuth(req.params.id);
              const body = {
                  message: "Removed bookmark",
                  repository: repo,
              };
              res.status(200).send(body);
          } catch (error) {
              console.log("ERROR: ", error);
              res.send(error);
          }
        }
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