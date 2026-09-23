import express from 'express'
import { authenticate } from '../../middlewares/auth.middleware';
import { addToCartController, clearCartController, getCartController, removeCartItemController, updateCartQuantityController } from './cart.controllers';

const cartRoutes = express.Router();

cartRoutes.post("/items", authenticate, addToCartController);

cartRoutes.get("/", authenticate, getCartController);

cartRoutes.patch("/items/:cartItemId", authenticate, updateCartQuantityController);

cartRoutes.delete("/items/:cartItemId", authenticate, removeCartItemController);

cartRoutes.delete("/items/", authenticate, clearCartController);


export default cartRoutes;

