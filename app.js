const express = require("express");
const cors = require("cors");
const api = require("./api");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", api);
const port = process.env.PORT || 3000;

// API initial point
app.get("/", (req, res) => {
  res.send("John Jasso's GitHub API");
});

app.listen(port, (err) => {
  if (err) {
    return console.log("ERROR: ", err);
  }
  console.log(`CORS-enabled web server listening on port ${port}...`);
});
