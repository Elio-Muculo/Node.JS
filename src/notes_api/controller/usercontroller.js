const express = require("express");
const app = express();

const Database = require("../config/database");
database = new Database();
database.init();

exports.find = (req, res) => {
  try {
    const data = database.select("SELECT * FROM user");
    console.log(data);
    res.json({ data });
  } catch (error) {
    res.status(500).send({ err: "error on database query" });
  }
};

exports.findOne = (req, res) => {
  const { id } = req.params;

  try {
    const data = database.findOne("SELECT * FROM user WHERE id = ?", id);
    console.log(data);
    res.json({ data });
  } catch (error) {
    res.status(500).send({ err: "error on database query" });
  }
};

