const util = require('util');
const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfhomework',
    password: 'hyfhomework',
    database: "homework"
});


const execQuery = util.promisify(connection.query.bind(connection));

async function aggregateQueries() {

    const paperAndTheNumberOfAuthor = `
        SELECT r.paper_title, COUNT(author_name)
        FROM authors a
        JOIN author_researchPapers ar
        ON a.author_no = ar.author_no
        JOIN research_Papers r
        ON r.paper_id = ar.paper_id
        GROUP BY r.paper_title;
        `;

    const papersPublishedByFemale = `
        SELECT  COUNT(DISTINCT paper_title)
        FROM authors a
        JOIN author_researchPapers ar
        ON a.author_no = ar.author_no
        JOIN research_Papers r
        ON r.paper_id = ar.paper_id
        WHERE a.gender='f';
        `;

    const averageHIndex = `
        SELECT university,AVG(h_index)
        FROM authors
        GROUP BY university;
        `;

    const sumResearchPaperPerUniversity = `
        SELECT university,count(paper_title)
        FROM authors a
        JOIN author_researchPapers ar
        ON a.author_no = ar.author_no
        JOIN research_Papers r
        ON r.paper_id = ar.paper_id
        GROUP BY a.university;
        `;

    const h_indexMinMaxPerUniversity = `
        SELECT university,MIN(h_index),MAX(h_index)
        FROM authors 
        GROUP BY university;
        `;

    connection.connect();

    const queries = [paperAndTheNumberOfAuthor, papersPublishedByFemale, averageHIndex, sumResearchPaperPerUniversity, h_indexMinMaxPerUniversity];

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

aggregateQueries()