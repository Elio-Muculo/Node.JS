const express = require('express');
const adminRoute = express.Router();
const controller = require('./../controller/projectocontroller');

adminRoute.get('/projects', controller);

module.exports = adminRoute;
