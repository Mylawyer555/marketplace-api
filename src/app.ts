import express, {Application, Request, Response, NextFunction} from 'express';
import { errorHandler } from './middlewares/err.middleware';
import cors from 'cors'

const app: Application = express();

//core middleware
app.use(cors());
app.use(express.json());

//health check

app.use(express.json());


export default app;