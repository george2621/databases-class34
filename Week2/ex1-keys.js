const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfhomework',
    password: 'hyfhomework'
});


const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {

    const dropDatabaseIfExists = "DROP DATABASE IF EXISTS homework ";
    const createDatabase = "CREATE DATABASE homework";
    const selectDatabase = "use homework";
    const creatAuthorsTable = `
    CREATE TABLE authors(
    author_no INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
    author_name VARCHAR(100) NOT NULL,
    university VARCHAR(100),
    date_of_birth DATE,
    h_index INTEGER,
    gender ENUM ('m','f')
    ) `;

    // Add mentor table and make it foreign key after insert data into authors the table
    const addMentor = `
    ALTER TABLE authors
    ADD mentor INTEGER
    `;

    connection.connect();

    const createDatabasesAndTables = [dropDatabaseIfExists, createDatabase, selectDatabase, creatAuthorsTable, addMentor];

    try {

        createDatabasesAndTables.forEach(async query => {
            await execQuery(query);
        })
    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();
}

seedDatabase();