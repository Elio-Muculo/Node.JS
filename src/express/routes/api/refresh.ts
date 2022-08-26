const expresss = require("express");
const routes = expresss.Router();
const refresh = require("../../controllers/refreshTokenController");

routes.get("/", refresh.handleRefreshToken);

module.exports = routes;
