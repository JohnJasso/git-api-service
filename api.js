"use strict";
const express = require("express");
const exploiter = require("./exploiter");
const validation = require("./validation");
const router = express.Router();

router.use(function (req, res, next) {
  const date = new Date();
  console.log(req.method, req.url, "@", date.toLocaleString());
  next();
});

// End-point for searching repositories
router.route("/search-repo").get(async (req, res) => {
  const { error } = validation.validateSearch(req.query);
  if (error) {
    return res
      .status(400)
      .send(
        'A search query should be included and defined as "?term=[searchquery]"'
      );
  } else {
    const query = req.query.term.replace(/ /g, "+");
    try {
      const response = await exploiter.search(query);
      if (!response) res.status(400).send("Not found");
      else if (
        response.message &&
        response.message.includes("API rate limit exceeded")
      ) {
        res.status(403).send("Git API rate limit exceeded");
      } else res.status(200).send(response);
    } catch (error) {
      console.log("ERROR: ", error);
      res.send(error);
    }
  }
});

// End-point for listing all bookmarks
router.route("/bookmarks").get(async (req, res) => {
  try {
    const response = await exploiter.listAuth();
    if (!response) res.status(400).send("Not found");
    else if (
      response.message &&
      response.message.includes("API rate limit exceeded")
    ) {
      res.status(403).send("Git API rate limit exceeded");
    } else res.status(200).send(response);
  } catch (error) {
    console.log("ERROR: ", error);
    res.send(error);
  }
});

router
  .route("/bookmark-repo/:id")
  // End-point for bookmarking a repository
  .put(async (req, res) => {
    const { error } = validation.validateID(req.params);
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      const repo = await exploiter.searchID(req.params.id);
      if (!repo.id) {
        if (repo.message && repo.message.includes("API rate limit exceeded")) {
          res.status(403).send("Git API rate limit exceeded");
        } else {
          res.status(404).send("Repository Not found");
        }
      } else {
        try {
          const response = await exploiter.starAuth(req.params.id);
          const body = {
            message: "Bookmarked repository",
            items: await exploiter.listAuth(),
          };
          if (
            response.message &&
            response.message.includes("API rate limit exceeded")
          ) {
            res.status(403).send("Git API rate limit exceeded");
          } else {
            res.status(200).send(body);
          }
        } catch (error) {
          console.log("ERROR: ", error);
          res.send(error);
        }
      }
    }
  })
  // End-point for removing a bookmark from a repository
  .delete(async (req, res) => {
    const { error } = validation.validateID(req.params);
    if (error) {
      return res.status(400).send(error.details[0].message);
    } else {
      const repo = await exploiter.searchID(req.params.id);
      if (!repo.id) {
        if (repo.message && repo.message.includes("API rate limit exceeded")) {
          res.status(403).send("Git API rate limit exceeded");
        } else {
          res.status(404).send("Repository Not found");
        }
      } else {
        try {
          const response = await exploiter.remStarAuth(req.params.id);
          const body = {
            message: "Removed bookmark",
            items: await exploiter.listAuth(),
          };
          if (
            response.message &&
            response.message.includes("API rate limit exceeded")
          ) {
            res.status(403).send("Git API rate limit exceeded");
          } else {
            res.status(200).send(body);
          }
        } catch (error) {
          console.log("ERROR: ", error);
          res.send(error);
        }
      }
    }
  });

module.exports = router;
