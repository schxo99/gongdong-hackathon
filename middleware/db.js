const mysql = require("mysql2/promise");

const pool = mysql.createPool({
    host: "13.124.68.247",
    user: "user3",
    password: "1111",
    port: 57536,
    database: "gongdong",
});

module.exports = pool;
