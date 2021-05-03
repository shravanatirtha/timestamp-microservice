const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.listen("5000", function (req, res) {
  console.log("node server on http://localhost:5000");
});
app.get("/api", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});
var message = "Add/Edit a date in address bar as /yyyy-mm-dd";
app.get("/api/timestamp", function (req, res) {
  res.json({
    unix: Date.now(),
    utc: Date,
    message: message,
  });
});

app.get("/api/timestamp/:date_string", (req, res) => {
  let dateString = req.params.date_string;
  if (/\d{5,}/.test(dateString)) {
    const dateInt = parseInt(dateString);
    res.json({
      unix: dateInt,
      utc: new Date(dateInt).toUTCString(),
      message: message,
    });
  } else {
    let dateObject = new Date(dateString);

    if (dateObject.toString() === "Invalid Date") {
      res.json({
        error: "Invalid Date",
      });
    } else {
      res.json({
        unix: dateObject.valueOf(),
        utc: dateObject.toUTCString(),
      });
    }
  }
});
