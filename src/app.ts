import express, {Application, Request, Response} from 'express';
import { errorHandler } from './middlewares/err.middleware';
import cors from 'cors'

const app: Application = express();

//core middleware
app.use(cors());
app.use(express.json());

//health check
app.get("/health", (req:Request, res: Response)=> {
    res.status(200).json({ status: "OK", timestamp: new Date().toISOString()})
})

// Global Error handler 
app.use(errorHandler)

export default app;