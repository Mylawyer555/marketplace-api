import express from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { addWishListController, deleteWishListController, getWishListController } from './wishlist.controller';


const wishlistRoute = express.Router();

wishlistRoute.post("/", authenticate, addWishListController);
wishlistRoute.get("/", authenticate, getWishListController);
wishlistRoute.delete("/:wishlistId", authenticate, deleteWishListController)

export default wishlistRoute;