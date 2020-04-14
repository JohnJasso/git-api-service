"use strict";
const express = require('express');
const exploiter = require("./exploiter");
const validation = require("./validation");
const router = express.Router();

router.use(function (req, res, next) {
    const date = new Date();
    console.log(req.method, req.url, "@", date.toLocaleString());
    next();
});

// End-point for searching repositories
router.route("/search-repo")
    .get(async (req, res) => {
        const { error } = validation.validateSearch(req.query);
        if (error) {
          return res
            .status(400)
            .send(
              'A search query should be included and defined as "?term=[searchquery]"'
            );
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
    });

// End-point for listing all bookmarks
router.route("/bookmarks")
    .get(async (req, res) => {
        try {
          const response = await exploiter.list();
          if (!response) res.status(400).send("Not found");
          else res.status(200).send(response);
        } catch (error) {
          console.log("ERROR: ", error);
          res.send(error);
        }
    });

router.route("/bookmark-repo/:id")
  // End-point for bookmarking a repository
  .put(async (req, res) => {
    const { error } = validation.validateID(req.params);
    if (error) {
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
  })
  // End-point for removing a bookmark from a repository
  .delete(async (req, res) => {
    const { error } = validation.validateID(req.params);
    if (error) {
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

module.exports = router;