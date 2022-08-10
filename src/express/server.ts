import path from "path";
import express = require("express");
const { logger, logEvents } = require("./middleware/events");
var app = express();

const PORT = process.env.PORT || 3500;

// ? custom middleware
 
app.use(logger);

// ? Middleware  built - in to handle urlencoded data
// ? form data
app.use(express.urlencoded({ extended: false }));

// build-in middleware for json data
app.use(express.json());

// ? build -in middleware for static files
app.use(express.static(path.join(__dirname, 'public')));



app.get("^/$|index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/new-page(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "new-page.html"));
});

app.get("/old-page(.html)?", (req, res) => {
  res.redirect(301, "new-page.html"); // 302 default
});

app.get("/*", (req, res) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});


app.listen(PORT, () => console.log(`listen on ${PORT}`));
