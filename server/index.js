const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const Pool = require('pg').Pool;
  
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'chessbackend',
    password: 'postgres',
    dialect: 'postgres',
    port: 5432
});

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }));

pool.connect((err, client, release) => {
    if (err) {
        return console.error(
            'Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
        release()
        if (err) {
            return console.error(
                'Error executing query', err.stack)
        }
        console.log("Connected to Database !")
    })
});

const server = app.listen(3000, function () {
    let host = server.address().address
    let port = server.address().port
    // Starting the Server at the port 3000
})