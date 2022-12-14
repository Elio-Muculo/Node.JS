import express = require("express");
var app = express();
import path from "path";
const cors = require("cors");
const cookieParser = require('cookie-parser');

const verifyJwt = require("./middleware/verifyjwt");
const employee = require("./routes/api/employee");
const errHandle = require("./middleware/error_handle");
const { corsOptions } = require('./utils/corsOptions');
const { logger, logEvents } = require("./middleware/events");

const PORT = process.env.PORT || 3500;

// ? custom middleware
app.use(logger);
app.use(cors(corsOptions));

// ? Middleware  built - in to handle urlencoded data
// ? form data
app.use(express.urlencoded({ extended: false }));

// ? build-in middleware for json data
app.use(express.json());

// middleware for cookie
app.use(cookieParser());

// ? build -in middleware for static files
app.use(express.static(path.join(__dirname, "public"))); // default is '/'
app.use('/subdir', express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));


// /api/v1/employees;
// get api/v1/employees/
// get api/v1/employees/:id
// post api/v1/employees/
app.use("/api/v1/register", require("./routes/api/register"));
app.use("/api/v1/login", require("./routes/api/auth"));
app.use("/api/v1/refresh", require("./routes/api/refresh"));
app.use("/api/v1/logout", require("./routes/api/logout"));

app.use(verifyJwt.verifyJwt);
app.use('/api/v1/employees', employee);

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
