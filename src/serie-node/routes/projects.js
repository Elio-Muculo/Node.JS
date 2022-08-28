const express = require('express');
const adminRoute = express.Router();
const controller = require('./../controller/projectocontroller');
const authMiddleware = require("../middleware/verifyUsers");

adminRoute.use(authMiddleware);
adminRoute.get('/projects', controller);

module.exports = adminRoute;
