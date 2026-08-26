import express from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { createStoreController, getMyStoreController } from './stores.controller';

const storeRoutes = express.Router();

storeRoutes.post("/", authenticate, createStoreController);
storeRoutes.get("/me", authenticate,getMyStoreController);


export default storeRoutes;