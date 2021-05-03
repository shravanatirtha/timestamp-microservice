const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
app.use(cors({ optionsSuccessStatus: 200 }));
app.listen("5000", function (req, res) {
  console.log("node server on http://localhost:5000");
});
app.use(express.static("public"));
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/api/:dateString?", (req, res) => {
  const dateString = req.params.dateString;
  let date;
  if (!dateString) {
    date = new Date();
  } else {
    if (!isNaN(dateString)) {
      date = new Date(parseInt(dateString));
    } else {
      date = new Date(dateString);
    }
  }
  if (date.toString() === "Invalid Date") {
    res.json({
      error: date.toString(),
    });
  } else {
    res.json({
      unix: date.getTime(),
      utc: date.toUTCString(),
    });
  }
});
