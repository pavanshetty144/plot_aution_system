
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DATABASE_CONNECTION_URL;


let db=null

async function connect() {
    try {
        const client = new MongoClient(uri, {
            serverApi: {
              version: ServerApiVersion.v1,
              strict: true,
              deprecationErrors: true,
            }
          });
      await client.connect();
      db = client.db();
      console.log('Connected to MongoDB Atlas');
    } catch (err) {
      console.error('Failed to connect to MongoDB Atlas:', err);
    }
  }

 async function getCollection(collectionName) {
    return await db.collection(collectionName);
  }




  function close() {
    if (client) {
      client.close();
      console.log('Disconnected from MongoDB Atlas');
    }
  }
  
  module.exports = {
    connect,
    getCollection,
    close,
  };