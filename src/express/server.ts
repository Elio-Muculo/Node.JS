import path from "path";
import express = require("express");
const cors = require("cors");
const { logger, logEvents } = require("./middleware/events");
const errHandle = require("./middleware/error_handle");
const employee = require("./routes/api/employee");
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
app.use(express.static(path.join(__dirname, "public"))); // default is '/'
app.use('/subdir', express.static(path.join(__dirname, "public")));

app.use("/", require("./routes/root"));
app.use("/subdir/", require("./routes/subdir"));


// /api/v1/employees;
// get api/v1/employees/
// get api/v1/employees/:id
// post api/v1/employees/

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
