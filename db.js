/*
Helpful article: https://mrvautin.com/re-use-mongodb-database-connection-in-routes/
*/

//Import MongoDB library; destructure to get access to ObjectId 
const { MongoClient, ObjectId } = require('mongodb')

//Declare database, connection string, database name
let mongodb,  
    dbConnectionStr = process.env.DB_STRING,    //get db connection string from .env
    dbName = 'dishes'

const connect = async () => {
    try {
        const client = await MongoClient.connect(dbConnectionStr, { useUnifiedTopology: true })

        console.log(`Connected to ${dbName} database`) //once successfully connected, log message in console
        mongodb = client.db(dbName)  //assign the 'dishes' database to db variable

    } catch (err) {
        console.log(err)
        process.exit(1)
    }
}

function get(){
    return mongodb;
}

function close(){
    mongodb.close();
}

module.exports = {
    connect,
    get,
    close
};