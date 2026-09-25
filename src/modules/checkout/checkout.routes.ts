import express from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { checkoutController } from './checkout.controller';


const checkoutRoute = express.Router();

checkoutRoute.post("/", authenticate, checkoutController)

export default checkoutRoute;