import express from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { getOrdersController } from './orders.controller';

const ordersRoute = express.Router();

ordersRoute.get("/", authenticate, getOrdersController);

export default ordersRoute;