const mysql = require('mysql');

const config = {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'notes'
}

module.exports = class Database {
    constructor(connection, data) {
        this.connection = connection;
        this.data = data;
    }

    init() {
        this.connection = mysql.createConnection(config); 
        this.connection.connect(err => {
            if (err) return console.log(err.message);

            console.log('conected...');
        });
    }

    select(query = '') {
        this.connection.query(query, (err, results) => {
            if (err) throw err;

            this.data = results;
        });

        return this.data;
    }

    findOne(query, id) {
        this.connection.query(query, [id], (err, results) => {
            if (err) throw err;

            this.data = results;
        })

        return this.data;
    }
}


