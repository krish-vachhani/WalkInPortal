const mysql = require("mysql2");

const connection = mysql.createConnection({
    host: `localhost`,
    user: `root`,
    password: `krish303`,
    database: `walk-in-portal`,
});

connection.connect();


module.exports = {
    connection
}

