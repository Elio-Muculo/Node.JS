const data = {
  employees: require("./../model/user.json"),
};


const getAllEmployees = (req, res) => {
  console.log(req);
  res.json(data.employees);
};


const createNewEmployees = (req, res) => {
  res.json({
    firstname: req.body.firstname,
        lastname: req.body.lastname,
  });
}; 


const updateEmployees = (req, res) => {
    res.json({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
}


const deleteEmployees = (req, res) => {
        res.json({
            "id": req.body.id
        });
}


const getEmployee = (req, res) => {
  res.json({
    id: req.params.id,
  });
}

module.exports = {
  getAllEmployees,
  createNewEmployees,
  updateEmployees,
  deleteEmployees,
  getEmployee
}