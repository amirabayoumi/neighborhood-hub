//connect with mongodb
import { MongoClient, Db, MongoClientOptions } from 'mongodb';
import "dotenv/config";

if (!process.env.MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}

const mongoUri = process.env.MONGODB_URI;
const mongoOptions: MongoClientOptions = {
  connectTimeoutMS: 5000,
  serverSelectionTimeoutMS: 5000,
};

let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  const globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
        console.log("MongoDB: No cached connection found, creating new connection");

    globalWithMongo._mongoClient = new MongoClient(mongoUri, mongoOptions);
    clientPromise = globalWithMongo._mongoClient.connect();
    console.log("MongoDB: New connection created");
  } else {
    clientPromise = Promise.resolve(globalWithMongo._mongoClient);
  }
} else {
  const client = new MongoClient(mongoUri, mongoOptions);
  clientPromise = client.connect();
}

// shutdown handler
async function exit() {
  try {
    const client = await clientPromise;
    await client.close();
    console.log("Disconnected from database");
  } catch (e) {
    console.error("Error during database disconnection:", e);
  }
  process.exit(0);
}

// Set up clean shutdown
process.on("SIGINT", exit);
process.on("SIGTERM", exit);

// Export both client promise and a function to get the DB
export default clientPromise;

export async function getDb(): Promise<Db> {
  const client = await clientPromise;
  return client.db('govocal'); 
}