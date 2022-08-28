const express = require('express');
const userRoute = express.Router();
const { find, findOne } = require('../controller/usercontroller');


exports.userRoute = userRoute.get("/", find);
exports.userRoute = userRoute.get("/:id", findOne);
