import dotenv from 'dotenv'
dotenv.config();

import app from './app';
import {db} from './config/db'

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        //test db connections
        await db.$connect();
        console.log("Connected to PostgreSQL database via Prisma");

        //start accepting incoming request
        app.listen(PORT, ()=> {
            console.log(`Server is running on http://localhost:${PORT}`);
        });
        
    } catch (error) {
        console.error("Failed to connect to database:", error)
        //disconnect safely before terminating process
        await db.$disconnect();
        process.exit(1);
    };
};

startServer();