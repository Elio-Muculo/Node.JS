const express = require('express');
const app = express();

const createProject = (req, res) => {
    res.status(201).send({ status: 'OK' });
}

module.exports = createProject;