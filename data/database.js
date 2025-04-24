import { MongoClient } from "mongodb";

let database;

async function connectToDatabase(uri){
    try{
        const client = new MongoClient(uri);
        await client.connect();
        database = client.db();
    }catch(err){
        console.error("Error connecting to the database", err);
        throw err;
    }
}

function getDatabase(){
    if(!database){
        throw new Error("Database not initialized. Call connectToDatabase first.");
    }
    return database;
}

export{ connectToDatabase , getDatabase as getDb};