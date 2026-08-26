import express from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { createStoreController } from './stores.controller';

const storeRoutes = express.Router();

storeRoutes.post("/", authenticate, createStoreController);


export default storeRoutes;