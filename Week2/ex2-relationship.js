const util = require('util');
const mysql = require('mysql');
const { connect } = require('http2');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'hyfhomework',
	password: 'hyfhomework',
	database: "homework"
});

const execQuery = util.promisify(connection.query.bind(connection));

async function insertData() {

	const createResearchPapersTable = `
		CREATE TABLE research_Papers (
			paper_id INTEGER AUTO_INCREMENT PRIMARY KEY NOT NULL,
			paper_title VARCHAR(250) NOT NULL,
			conference VARCHAR(250),
			publish_date DATE
		)
		`;

	const createAuthorResearchPapersTable = `
		CREATE TABLE author_researchPapers(
			author_no INTEGER NOT NULL,
			paper_id INTEGER NOT NULL,
			FOREIGN KEY(author_no) REFERENCES authors(author_no), 
			FOREIGN KEY(paper_id) REFERENCES research_Papers(paper_id), 
			PRIMARY KEY(author_no,paper_id)
		)
		`;

	const insertIntoAuthors = `
		INSERT INTO authors (author_name,university,date_of_birth,h_index,gender,mentor)
		VALUES ('James Patterson','University of Cambridge','1988-02-12',9,'m',2),
			('Elly Griggiths','Stanford University','1990-12-10',8.5,'m',4),
			('Edward Marston','University of Cambridge','1980-05-30',9.5,'m',6),
			('Nora Roberts','University of Oxford','1992-08-20',7.5,'f',8),
			('Christine Feehan','University of Oxford','1991-11-23',7,'f',11),
			('Peter James','Massachusetts Institute of Technology (MIT)','1994-01-03',10,'m',1),
			('Lisa Jewell','University of Oxford','1991-11-23',7,'f',13),
			('Kate Ellis','Stanford University','1996-04-28',8.5,'f',12),
			('George Roumieh','University Of Twente','1995-10-26',9,'m',1),
			('Roy Roumieh','University Of Amsterdam','1998-05-18',8,'m',3),
			('Sara Maas','University Of Amsterdam','1999-02-18',8,'f',9),
			('Anjela Marsons','Massachusetts Institute of Technology (MIT)','1987-05-18',8.5,'f',10),
			('Stephen King','University Of Amsterdam','1994-05-18',6,'m',12),
			('Danielle Steel','Harvard University','1992-10-18',7,'m',5),
			('Karen Rose','University Of Twente','1994-05-18',10,'f',3);
		`;

	const insertIntoResearchPapers = `
		INSERT INTO research_Papers (paper_title,publish_date)
		VALUES ('Gravitational Radiation from Colliding Black Holes','2021-01-13'),
			('Breakdown of predictability in gravitational collapse','2012-02-12'),
			('Action integrals and partition functions in quantum gravity','2018-02-24'),
			('Wave function of the Universe','2012-03-31'),
			('Thèses présentée a la Faculté des Sciencies de Paris pour obtenir le grade de docteur ès sciences physiques','2022-12-11'),
			('Teslas Oscillator and Other Inventions, Century Illustrated','2019-03-02'),
			('Earth Electricity to Kill Monopoly, The World Sunday Magazine','2017-05-09'),
			('Inventor Teslas Plant Nearing Completion, Brooklyn Eagle','2016-07-07'),
			('The molecular configuration of deoxyribonucleic acid. I. X-ray diffraction study of a crystalline form of the lithium salt','2018-11-08'),
			('Determination of the helical configuration of ribonucleic acid molecules by X-ray diffraction study of crystalline amino-acid-transfer ribonucleic acid','2022-11-23'),
			('On Computable Numbers, with an Application to the Entscheidungsproblem','2021-06-19'),
			('The chemical basis of morphogenesis','2016-03-17'),
			('Of Molecules and Men','2022-02-19'),
			('Personal View of Scientific Discovery','2013-02-15'),
			('rapid approximate method for correcting the low-angle scattering measurements for the influence of the finite height of the X-ray beam','2012-05-14'),
			('Order-Disorder Transitions in Structures Containing Helical Molecules','2018-07-16'),
			('The Crystal Structure of Tipula Iridescent Virus as Determined by Bragg Reflection of Visible Light','2019-10-11'),
			('The Structure of Viruses as Determined by X-Ray Diffraction','2019-10-11'),
			('On the Antibacterial Action of Cultures of a Penicillium, with Special Reference to their Use in the Isolation of B. Influenzæ','2020-11-09'),
			('On a remarkable bacteriolytic element found in tissues and secretions','2020-01-10'),
			('The Case for Space: Why We Should Keep Reaching for the Stars','2021-02-13'),
			('Immersive Dome Experiences for Accelerating Science','2021-03-12'),
			('FEAR OF NUMBERS','2021-04-15'),
			('On the determination of the tension of a recently formed water-surface','2020-05-16'),
			('Can quantum-mechanical description of physical reality be considered complete','2019-06-19'),
			('SPACE-TIME APPROACH TO NON-RELATIVISTIC QUANTUM MECHANICS','2019-07-14'),
			('Forces in Molecules','2018-08-12'),
			('Distributed database systems: where are we now?','2020-09-10'),
			('Photoelectric effect','2021-09-23')
		`;

	const insertInoAuthorPapers = `
		INSERT INTO author_researchPapers (author_no,paper_id)
		VALUES (1,1),(1,2),(2,3),(3,4),(4,5),(5,6),(12,7),(11,8),(2,9),(3,10),(4,11),(12,12),(10,13),(3,14),(2,15),(1,16),
		(1,17),(5,17),(2,12),(11,11),(6,4),(7,2),(7,18),(7,19),(3,19),(1,20),(2,21),(3,22),(3,23),(11,24),(12,25),(1,24),(1,7),(2,1),(3,26),
		(4,27),(5,28),(6,29),(7,29),(1,27),(12,6),(13,6),(14,7),(15,13)
		`;


	const updateMentor = `
		ALTER TABLE authors
		ADD CONSTRAINT FOREIGN KEY(mentor) REFERENCES authors(author_no);
		`;

	connection.connect();

	const queries = [createResearchPapersTable, createAuthorResearchPapersTable, insertIntoAuthors, updateMentor, insertIntoResearchPapers, insertInoAuthorPapers];

	try {
		queries.forEach(async query => {
			await execQuery(query);
		})
	}
	catch (error) {
		console.error(error);
		connection.end();
	}

	connection.end();
}

insertData();