const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfhomework',
    password: 'hyfhomework'
});


const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {

    const dropDatabaseIfExists = "DROP DATABASE IF EXISTS dinner_meeting ";
    const createDatabase = "CREATE DATABASE dinner_meeting";
    const selectDatabase = "use dinner_meeting";

    const createMemberTable = `
    CREATE TABLE member(
    member_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    member_name VARCHAR(50) NOT NULL,
    address VARCHAR(250)
    )`;

    const dinnerTable = `
    CREATE TABLE dinner(
    dinner_id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    date DATE NOT NULL,
    )`;

    const foodTable = `
    CREATE TABLE food(
    food_code INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    food_description VARCHAR(250)
    )`;

    const venueTable = `
    CREATE TABLE venue(
        venue_code INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
        venue_description VARCHAR(250)
        )`;


    const memberAndDinnerTable = `
    CREATE TABLE memberAndDinner(
        member_id INT NOT NULL,
        dinner_id INT NOT NULL,
        PRIMARY KEY(member_id, dinner_id),
        FOREIGN KEY(member_id) REFERENCES member(member_id),
        FOREIGN KEY(dinner_id) REFERENCES dinner(dinner_id)
    )`;

    const dinnerAndFoodTable = `
    CREATE TABLE dinnerAndFood(
        food_code INT NOT NULL,
        dinner_id INT NOT NULL,
        PRIMARY KEY(food_code, dinner_id),
        FOREIGN KEY(food_code) REFERENCES food(food_code),
        FOREIGN KEY(dinner_id) REFERENCES dinner(dinner_id)
    )`;

    const dinnerAndVenueTable = `
    CREATE TABLE dinnerAndFood(
        dinner_id INT NOT NULL,
        venue_code INT NOT NULL,
        PRIMARY KEY(venue_code, dinner_id),
        FOREIGN KEY(venue_code) REFERENCES venue(venue_code),
        FOREIGN KEY(dinner_id) REFERENCES dinner(dinner_id)
    )`;



    const tables = [dropDatabaseIfExists, createDatabase, selectDatabase, createMemberTable, dinnerTable, foodTable, venueTable, memberAndDinnerTable, dinnerAndFoodTable, dinnerAndVenueTable];

    try {
        tables.forEach(async table => {
            await execQuery(table)
        })
    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();
}

seedDatabase();