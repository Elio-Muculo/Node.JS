const data = {
  employees: "",
};

data.employees = require("./../model/user.json");

module.exports.getAllEmployees = (req, res) => {
  res.json(data.employees);
};


module.exports.createNewEmployees = (req, res) => {
  res.json({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
  });
}; 


module.exports.updateEmployees = (req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
}


module.exports.deleteEmployees = (req, res) => {
  res.json({
    id: req.body.id,
  });
};


module.exports.getEmployee = (req, res) => {
  res.json({
    id: req.params.id,
  });
};


