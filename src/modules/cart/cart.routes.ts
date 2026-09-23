import express from 'express'
import { authenticate } from '../../middlewares/auth.middleware';
import { addToCartController, getCartController, updateCartQuantityController } from './cart.controllers';

const cartRoutes = express.Router();

cartRoutes.post("/items", authenticate, addToCartController);

cartRoutes.get("/", authenticate, getCartController);

cartRoutes.patch("/items/:cartItemId", authenticate, updateCartQuantityController);


export default cartRoutes;