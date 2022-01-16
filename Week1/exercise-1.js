const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
});

connection.connect();

const initializeDatabase = () => {

    const dropDatabase = "DROP DATABASE IF EXISTS meetup";
    const createDatabase = "CREATE DATABASE meetup";
    const selectDatabase = "use meetup";
    const creatInviteeTable = `
        CREATE TABLE invitee(
        invitee_no INT AUTO_INCREMENT PRIMARY KEY,
        invitee_name VARCHAR(50) NOT NULL,
        invited_by VARCHAR(50) 
        ) `;

    const createRoomTable = `
         CREATE TABLE room(
         room_no INT AUTO_INCREMENT PRIMARY KEY,
         room_name VARCHAR(50) NOT NULL,
         floor_number VARCHAR(50)  NOT NULL
         )`;

    const creatMeetingTable = `
         CREATE TABLE meeting(
         meeting_no INT AUTO_INCREMENT PRIMARY KEY,
         meeting_title VARCHAR(50),
         starting_time DATETIME,
         ending_time DATETIME,
         room_no int,
         FOREIGN KEY (room_no) REFERENCES room(room_no))`;

    const creatTables = [dropDatabase, createDatabase, selectDatabase, creatInviteeTable, createRoomTable, creatMeetingTable];
    creatTables.forEach(table => {
        connection.query(table, (error, results) => {
            if (error) {
                throw error;
            }
            console.log(`data base initialized... `, results);
        });
    })

}


const inviteeTable = [
    "INSERT INTO invitee SET invitee_name='George Roumieh', invited_by='Partnership Manager'",
    "INSERT INTO invitee SET invitee_name='John Doe', invited_by='Education Support'",
    "INSERT INTO invitee SET invitee_name='Roy Roumieh', invited_by='Partnership Manager'",
    "INSERT INTO invitee SET invitee_name='Dib Doe', invited_by='Education Support'",
    "INSERT INTO invitee SET invitee_name='Rob Doe', invited_by='Partnership Manager'"
];

const roomsTable = [
    "INSERT INTO room SET room_name='Dining Room', floor_number='12'",
    "INSERT INTO room SET room_name='Meeting Room', floor_number='3'",
    "INSERT INTO room SET room_name='Conference Room', floor_number='4'",
    "INSERT INTO room SET room_name='Main Online Meeting Room', floor_number='32'",
    "INSERT INTO room SET room_name='Events Room', floor_number='1'"
];


const meetingTable = [
    "INSERT INTO meeting SET meeting_title='Database Q&A week1', starting_time='2021-10-10 11:00:07', ending_time='2023-10-10 11:00:07', room_no =1",
    "INSERT INTO meeting SET meeting_title='Mentor Meeting', starting_time='2021-10-10 11:00:07', ending_time='2023-10-10 11:00:07', room_no = 2",
    "INSERT INTO meeting SET meeting_title='Catch Up meeting', starting_time='2021-10-10 11:00:07', ending_time='2023-10-10 11:00:07', room_no = 4",
    "INSERT INTO meeting SET meeting_title='Presentation', starting_time='2021-10-10 11:00:07', ending_time='2023-10-10 11:00:07', room_no = 3",
    "INSERT INTO meeting SET meeting_title='Sign Contract', starting_time='2021-10-10 11:00:07', ending_time='2023-10-10 11:00:07', room_no = 1"
];



const insertDataIntoTables = (tableData) => {
    tableData.forEach(query => {
        connection.query(query, function (error, results) {
            if (error) {
                throw error;
            }
            console.log(`data inserted... `, results);
        });
    })
}


initializeDatabase();
insertDataIntoTables(inviteeTable);
insertDataIntoTables(roomsTable);
insertDataIntoTables(meetingTable);

connection.end();
