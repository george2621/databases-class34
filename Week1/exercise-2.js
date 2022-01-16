var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'world'
});

connection.connect();

// 1-What are the names of countries with population greater than 8 million?
const populationGreaterThan8Million = `
SELECT name AS Country_Name , population AS Country_Population 
FROM country 
WHERE  population > 8000000`;

// 2-What are the names of countries that have “land” in their names?
const countryHaveLand = `
SELECT name AS Country_Name 
FROM country 
WHERE  name like '%land%'`;

// 3-What are the names of the cities with population in between 500,000 and 1 million?
const cityPopulationBetween = `
SELECT name AS City_Name , population AS City_Population 
FROM city 
WHERE  population 
BETWEEN 500000 AND 1000000
`;

// 4-What's the name of all the countries on the continent ‘Europe’?
const countryInEurope = `
SELECT name AS Country_Name 
FROM country 
WHERE  continent = "europe";`;

// 5-List all the countries in the descending order of their surface areas.
const countriesOrdererBySurfaceArea = `
SELECT name AS Country_Name, surfacearea AS Country_Surfacearea 
FROM country 
ORDER BY surfacearea desc`;

// 6-What are the names of all the cities in the Netherlands?
const citiesInTheNetherland = `
SELECT city.name 
FROM city  
JOIN country  
ON city.countrycode=country.code 
WHERE country.name="Netherlands"
`;

// 7-What is the population of Rotterdam?
const populationOfRotterdam = `
SELECT name AS City_name, population As Rotterdam_Population 
FROM city 
WHERE name="Rotterdam"
`;

// 8-What's the top 10 countries by Surface Area?
const top10CountryBySurfaceArea = `
SELECT name AS Country_Name, surfacearea AS Country_Surfacearea 
FROM country 
ORDER BY surfacearea desc 
LIMIT 10
`;

// 9-What's the top 10 most populated cities?
const top10MostPopulatedCities = `
SELECT name AS City_Name, population AS City_Population 
FROM city 
ORDER BY population desc 
LIMIT 10
`;

// 10-What is the population number of the world?
const populationNumberOfWorld = `
SELECT SUM(population) AS Population_Of_World 
FROM country
`;



const queries = [populationGreaterThan8Million, countryHaveLand, cityPopulationBetween, countryInEurope, countriesOrdererBySurfaceArea,
    citiesInTheNetherland, populationOfRotterdam, top10CountryBySurfaceArea, top10MostPopulatedCities, populationNumberOfWorld];

queries.forEach(query => {
    connection.query(query, (err, result) => {
        if (err) throw err;
        console.log(`Queries ${queries.indexOf(query) + 1} Executed ... `, result)
    })
});

connection.end();
