const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();

const uri = process.env.MONGO_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let db;

async function connectDB() {
  await client.connect();
  console.log("Connected to MongoDB Atlas!!");

  db = client.db("myDatabase"); // database will be created automatically
}

function getDB() {
  return db;
}

module.exports = { connectDB, getDB };
