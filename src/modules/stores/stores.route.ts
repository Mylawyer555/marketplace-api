import express from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { createStoreController, getMyStoreController, updateStoreController } from './stores.controller';

const storeRoutes = express.Router();

storeRoutes.post("/", authenticate, createStoreController);
storeRoutes.get("/me", authenticate,getMyStoreController);
storeRoutes.patch("/me", authenticate, updateStoreController);


export default storeRoutes;