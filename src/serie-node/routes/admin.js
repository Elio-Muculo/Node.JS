const express = require('express');
const adminRoute = express.Router();


adminRoute.get('/', (req, res) => {
});


adminRoute.get("/with", (req, res) => {
  console.log("sou admin");
});


module.exports = adminRoute;
