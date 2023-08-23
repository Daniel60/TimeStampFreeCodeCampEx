// index.js
// where your node app starts

// init project
var express = require("express");
var app = express();

var RateLimit = require("express-rate-limit");
var limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 10,
});

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

app.use(limiter);
// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

// your first API endpoint...
app.get("/api/hello", function (req, res) {
  console.log(req.headers.host + req.path);
  res.json({ greeting: "hello API" });
});

app.get("/api/:date?", function (req, res) {
  console.log(req.headers.host + req.path);
  inputDate = req.params.date;

  if (!inputDate) {
    nowDate = new Date();
    retJson = {
      unix: nowDate.valueOf(),
      utc: nowDate.toUTCString(),
    };

    console.log(retJson);
    return res.json(retJson);
  }

  if (!isNaN(Number(inputDate))) {
    inputDate = Number(inputDate);
  }

  const dates = new Date(inputDate);
  let localUnixMili = dates.valueOf();
  let localUtc = dates.toUTCString();

  if (dates == "Invalid Date") {
    retJson = { error: dates.toString() };
  } else {
    retJson = { unix: localUnixMili, utc: localUtc };
  }

  console.log(retJson);
  res.json(retJson);
});

process.env.PORT = 3000;
// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log("Your app is listening on port " + listener.address().port);
});
