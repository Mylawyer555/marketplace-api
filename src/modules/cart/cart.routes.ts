import express from 'express'
import { authenticate } from '../../middlewares/auth.middleware';
import { addToCartController } from './cart.controllers';

const cartRoutes = express.Router();

cartRoutes.post("/items", authenticate, addToCartController)


export default cartRoutes