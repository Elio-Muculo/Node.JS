import express = require('express');
const router = express.Router();
const path = require('path');
const {
  getAllEmployees,
  getEmployee,
  deleteEmployees,
  createNewEmployees,

} = require("./../../controllers/employeesController");


router.route('/')
    .get((req, res) => {
        res.json(data.employees);
    });


module.exports = router;