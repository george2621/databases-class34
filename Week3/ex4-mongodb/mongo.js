const MongoClient = require('mongodb').MongoClient;
var url = "mongodb+srv://mongo:mongo-12345@cluster0.klysk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

async function seedDatabase() {
    const client = new MongoClient(url);
    try {
        await client.connect();

        //Create a new record
        await client.db("world").collection('city').insertOne({ name: 'Qattinah', country_code: 'SYR', district: 'south_homs', population: 8000 });

        //Update that record with a new population
        await client.db("world").collection('city').updateMany({ name: 'Qattinah' }, { $set: { population: 12000 } });

        //Find record by city name city
        const findCityByName = await client.db("world").collection('city').find({ name: 'Qattinah' }).toArray();
        console.log(findCityByName);

        //Find record by country record name city
        await client.db("world").collection('city').find({ $and: [{ country_code: 'SYR' }, { name: 'Qattinah' }] }).toArray();

        //Delete the city
        await client.db("world").collection('city').deleteMany({ name: 'Qattinah' });

    } catch (error) {
        console.log(error);
    }
    finally {
        await client.close();
    }
}

seedDatabase();
