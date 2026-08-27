import express, { Request, Response} from 'express';
import { errorHandler } from './middlewares/err.middleware';
import cors from 'cors'
import authRoutes from './modules/auth/auth.route';
import sellerRoutes from './modules/seller/sellers.route';
import storeRoutes from './modules/stores/stores.route';
import productRoutes from './modules/products/products.routes';

const app = express();

//core middleware
app.use(cors());
app.use(express.json());


//health check
app.get("/", (req:Request, res: Response)=> {
    res.json({
        message:"MarketPlace is running"
    })
})
app.use("/api/v1/auth", authRoutes)
app.use("/api/v1/sellers", sellerRoutes)
app.use("/api/v1/stores", storeRoutes)
app.use("/api/v1/products", productRoutes)

// Global Error handler 
app.use(errorHandler)

export default app;