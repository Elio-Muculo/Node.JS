const express = require('express');
const userRoute = express.Router();
const controller = require("../controller/usercontroller");
// const verify = require("../middleware/verifyUsers");

// ? use verify middleware to only get / endpoint
// userRoute.get('/', verify, (req, res) => {
//     console.log(req.headers.token);
// });


// userRoute.get("/with", (req, res) => {
//     console.log(`${req.headers.token} token do sem middleware`);
//   console.log("sou controller sem middleware");
// });


userRoute.post("/register", controller.register);
userRoute.post("/login", controller.authenticate);

module.exports = userRoute;
