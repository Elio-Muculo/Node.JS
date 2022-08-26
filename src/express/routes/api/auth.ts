const expres = require('express');
const route = expres.Router();
const authcontroller = require('../../controllers/authController')

route.post("/", authcontroller.handleLogin);

module.exports = route;
