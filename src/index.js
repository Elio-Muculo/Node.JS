const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const userRoute = require("./serie-node/routes/user");
// const adminRoute = require("./serie-node/routes/admin");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// ? use this middleware only for all userRoute path
// userRoute.use(require('./serie-node/middleware/verifyUsers'));

app.use("/api/v1", userRoute);
// app.use("/admin", adminRoute);

// require('./serie-node/controller/usercontroller')(app);

app.listen(3500, () => console.log(`listen on port 3500`));