const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfhomework',
    password: 'hyfhomework'
});


const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {

    const dropDatabaseIfExists = "DROP DATABASE IF EXISTS bank ";
    const createDatabase = "CREATE DATABASE bank";
    const selectDatabase = "use bank";
    const createAccountTable = `
    CREATE TABLE account(
        account_number INT PRIMARY KEY NOT NULL  AUTO_INCREMENT,
        balance DECIMAL(15,2) NOT NULL
    ) `;

    const createAccountNumberTable = `
    CREATE TABLE account_number(
        change_number INT PRIMARY KEY NOT NULL  AUTO_INCREMENT,
        account_number INT NOT NULL,
        amount DECIMAL(15,2) NOT NULL,
        changed_date DATE NOT NULL,
        remark VARCHAR(250),
        FOREIGN KEY(account_number) REFERENCES account(account_number)
      )`;

    const tableAutoIncrement = 'ALTER TABLE account AUTO_INCREMENT=101'

    connection.connect();

    const createDatabasesAndTables = [dropDatabaseIfExists, createDatabase, selectDatabase, createAccountTable, createAccountNumberTable, tableAutoIncrement];

    try {
        createDatabasesAndTables.forEach(async query => {
            await execQuery(query);
        })
        console.log('Database and Table are created ..');
    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();
}

seedDatabase();