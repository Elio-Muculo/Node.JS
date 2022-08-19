import express = require('express');
const router = express.Router();
const path = require('path');
const employeesController = require('./../../controllers/employeesController');


router.route('/')
    .get(employeesController.getAllEmployees)
    .post(employeesController.createNewEmployees)
    .put(employeesController.updateEmployees)


router.route('/:id')    
    .delete(employeesController.deleteEmployees)
    .get(employeesController.getEmployee);


module.exports = router;

