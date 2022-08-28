const express = require('express');
const app = express();
const { userRoute } = require('./routes/user');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use('/api/v1/users', userRoute);

app.listen(3000, console.log(`listen on port ${3000}`));