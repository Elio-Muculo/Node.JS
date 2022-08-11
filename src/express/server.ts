import path from "path";
import express = require("express");
const cors = require("cors");
const { logger, logEvents } = require("./middleware/events");
const errHandle = require("./middleware/error_handle");
var app = express();

const PORT = process.env.PORT || 3500;

// ? custom middleware

app.use(logger);

// ? third party middleware
const whiteList = [
  "https://www.google.com",
  "http://127.0.0.1:5500",
  "http://localhost:3500",
];

const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by the cors"));
    }
  },
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// ? Middleware  built - in to handle urlencoded data
// ? form data
app.use(express.urlencoded({ extended: false }));

// build-in middleware for json data
app.use(express.json());

// ? build -in middleware for static files
app.use(express.static(path.join(__dirname, "public")));

app.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "new-page.html"); // 302 default
});

// app.all() -  accepts all methods
// app.use() - used for middleware | not accept regex

app.all("/*", (req, res) => {
  res.status(404);
  if (req.accepts("html")) {
    res.sendFile(path.join(__dirname, "views", "404.html"));
  } else if (req.accepts("json")) {
    res.json({ error: "400 Not Found" });
  } else {
    res.type("txt").send("Not Found 404");
  }
});

app.use(errHandle);

app.listen(PORT, () => console.log(`listen on ${PORT}`));
