require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const bodyParser = require('body-parser')
// Basic Configuration
const port = process.env.PORT || 3000;

// Storing url/shorturl pairs
const urlLookup = {
  1: "https://www.google.co.nz",
  2: "https://www.apple.co.nz",
  3: "https://www.newzealand.com",
};

app.use(cors());

app.use("/public", express.static(`${process.cwd()}/public`));

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) 

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

// Your first API endpoint
app.get("/api/hello", function (req, res) {
  res.json({ greeting: "hello API" });
});

// endpoint for creating shorturl
app.post("/api/shorturl", function (req, res) {
  const original_url = req.body.url
  const short_url = Object.keys(urlLookup).length + 1
  urlLookup[short_url] = original_url
  res.json({original_url, short_url});
});

// endpoint for retrieving fullurl
app.get("/api/shorturl/:surl", function (req, res) {
  const short_url = req.params.surl
  const original_url = urlLookup[short_url]
  res.redirect(301, original_url);
});

app.listen(port, function () {
  console.log(`Listening on port ${port}`);
});
