const userDB = {
    users: require('../model/user.json'),
    setUsers: function (data) { this.users = data }
}

const fsPromises = require('fs/promises');
const path =  require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
    const { user, pwd } = req.body;
    if (!user || !pwd) return res.status(400).json({ 'message': 'username and password are required' });

    // check for duplicate users
    const duplicate = userDB.users.find(person => person.username === user);

    if (duplicate) return res.sendStatus(409); // conflict

    try {
        // encrypt
        const hashPwd = await bcrypt.hash(pwd, 10);

        // store the new user
        const newUser = { "username": user, "password": hashPwd };
        userDB.setUsers([...userDB.users, newUser]);

        await fsPromises(
            path.join(__dirname, '..', 'model', 'user.json'),
            JSON.stringify(userDB.setUsers)
        );
        console.log(userDB.users);
        res.status(201).json({ 'sucess':  `new user ${user} created` });

    } catch (error) {
        res.status(500).json({ 'message': error.message });
    }
}



module.exports = { handleNewUser };