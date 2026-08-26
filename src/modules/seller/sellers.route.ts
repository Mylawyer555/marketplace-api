import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import { becomeSellerController } from "./sellers.controller";

const sellerRoutes = express.Router();

sellerRoutes.post("/become-seller", authenticate, becomeSellerController);

export default sellerRoutes;
