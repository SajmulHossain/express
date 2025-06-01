import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from 'dotenv';
import app from "../app";

dotenv.config();

const uri =
  `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.pknd7d9.mongodb.net/todosDB?retryWrites=true&w=majority&appName=Cluster0`;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
