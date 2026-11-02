import dns from "node:dns";
import { MongoClient } from "mongodb";

// Use public DNS servers for MongoDB Atlas SRV lookup.
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const uri = process.env.MONGODB_URI;
const dbName = process.env.DB_NAME;

if (!uri) {
  throw new Error("MONGODB_URI is missing from client/.env.local");
}

if (!dbName) {
  throw new Error("DB_NAME is missing from client/.env.local");
}

const globalForMongo = globalThis as typeof globalThis & {
  mongoClient?: MongoClient;
};

export const mongoClient =
  globalForMongo.mongoClient ??
  new MongoClient(uri, {
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 15000,
  });

if (process.env.NODE_ENV !== "production") {
  globalForMongo.mongoClient = mongoClient;
}

export const mongoDb = mongoClient.db(dbName);