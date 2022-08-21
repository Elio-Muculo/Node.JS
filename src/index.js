const express = require('express');
const bodyParser = require('body-parser');


const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


require('./serie-node/controller/usercontroller')(app);
require("./serie-node/controller/bookcontroller")(app);

app.listen(3500, () => console.log(`listen on port 3500`));