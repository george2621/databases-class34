const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfhomework',
    password: 'hyfhomework',
    database: "homework"
});

const execQuery = util.promisify(connection.query.bind(connection));

async function joinsQueries() {

    const selectAuthorAndMentor = `
        SELECT a.author_name , m.author_name AS mentor
        FROM authors a
        LEFT JOIN authors m
        ON a.mentor = m.author_no;
        `;

    const selectAuthorAndPapers = `
        SELECT a.* ,r.paper_title
        FROM authors a
        LEFT JOIN author_researchPapers re
        ON a.author_no=re.author_no
        LEFT JOIN research_Papers r
        ON r.paper_id=re.author_no
        `;

    connection.connect();

    const queries = [selectAuthorAndMentor, selectAuthorAndPapers];

    try {
        queries.forEach(async query => {
            await execQuery(query);
        })
    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();

}

joinsQueries();