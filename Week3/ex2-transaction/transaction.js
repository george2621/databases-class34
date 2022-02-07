const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfhomework',
    password: 'hyfhomework',
    database: 'bank'
});


const execQuery = util.promisify(connection.query.bind(connection));

async function transaction() {


    const transferredAccount = { account_number: 101 };
    const receivedAccount = { account_number: 102 };

    const startTransaction = `START TRANSACTION`;
    const withDrawMony = `UPDATE account SET balance = balance - 1000 WHERE  ?`;
    const depositMony = `UPDATE account SET balance = balance + 1000 WHERE  ?`;
    const insertReceivedMony = `INSERT INTO account_number SET account_number=102,amount=1000,changed_date='2020-12-25',remark='receive money'`
    const insertSendedMoney = `INSERT INTO account_number SET account_number=101,amount=1000,changed_date='2020-12-25',remark='withdraw money'`
    const commit = `COMMIT`

    try {
        await execQuery(startTransaction)
        await execQuery(withDrawMony, transferredAccount);
        await execQuery(depositMony, receivedAccount);
        await execQuery(insertReceivedMony);
        await execQuery(insertSendedMoney);
        await execQuery(commit)

        console.log('Money transferred..');
    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();
}

transaction();