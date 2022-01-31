const util = require('util');
const mysql = require('mysql');
const accounts = require('./accounts_data.js')
const accounts_number = require('./accounts_number_data.js')

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfhomework',
    password: 'hyfhomework',
    database: 'bank'
});


const execQuery = util.promisify(connection.query.bind(connection));

async function insertData() {

    connection.connect();

    try {
        accounts.forEach(async account => {
            await execQuery('INSERT INTO account SET ?', account);
        })

        accounts_number.forEach(async account_number => {
            await execQuery('INSERT INTO account_number SET ?', account_number);
        })

        console.log('Data is Inserted ..');

    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();
}

insertData();






