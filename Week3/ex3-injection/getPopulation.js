const mysql = require('mysql');


const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfhomework',
    password: 'hyfhomework',
    database: 'world'
});

connection.connect();

function getPopulation(Country, name, code, cb) {

    const post = [{ name: name }, { code: code }];
    const query = `SELECT Population FROM ${Country} WHERE ? and  ?`;
    connection.query(query, post, (err, result) => {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(result[0]);
    }
    );

    connection.end()
}

getPopulation('country', 'Syria', 'SYR', console.log);

//If I didn't change the query and add a condition 1=1  there will be an injection. 
//For Example : query = SELECT Population FROM ${Country} WHERE name =${name} and code=${code} or 1=1;
//getPopulation('country', 'Syria', "SYR' OR' 1=1", console.log);
// the query will return all records from the table