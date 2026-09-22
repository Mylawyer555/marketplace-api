import express from 'express'
import { authenticate } from '../../middlewares/auth.middleware';
import { addToCartController, getCartController } from './cart.controllers';

const cartRoutes = express.Router();

cartRoutes.post("/items", authenticate, addToCartController);

cartRoutes.get("/", authenticate, getCartController);


export default cartRoutes