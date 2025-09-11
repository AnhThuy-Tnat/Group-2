import express from "express";
import { connectdb } from "./config/dbconn.js";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@as-integrations/express5";
import { typeDefs, resolvers } from "./schema/schema.js";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from 'dotenv';


dotenv.config();
async function start() {
    try {
        // 1. Connect DB
        await connectdb();

        // 2. Tạo Apollo server
        const server = new ApolloServer({ typeDefs, resolvers });
        await server.start();

        // 3. Tạo express app
        const app = express();
        app.use(
            "/graphql",
            cors(),
            bodyParser.json(),
            expressMiddleware(server)
        );

        // 4. Listen 1 lần
        app.listen(process.env.PORT, () => {
            console.log("🚀 Server running at http://localhost:4000/graphql");
        });
    } catch (err) {
        console.error("❌ Error starting server:", err);
    }
}

start();
