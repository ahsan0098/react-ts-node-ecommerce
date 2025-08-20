
/*===========*****===========imports===========*****===========*/
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import typeDefs from './type-defs.js';
import resolvers from './resolvers.js';
import dotenv from "dotenv";
import mongoose from "mongoose";
dotenv.config();
/*===========*****===========imports===========*****===========*/


mongoose.connect(process.env.MONGO_URI);

mongoose.connection.once("open", () => {
    console.log("✅ Connected to MongoDB");
});

const server = new ApolloServer({
    typeDefs,
    resolvers,
});


const { url } = await startStandaloneServer(server, {
    listen: { port: process.env.GQL_PORT },
});

console.log(`GraphQL server is listening at ${url}...`);
