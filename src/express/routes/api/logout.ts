const exp = require("express");
const rout = exp.Router();
const logout = require("../../controllers/logoutcontroller");

rout.get("/", logout.handleLogout);

module.exports = rout;
