import express from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { getOrdersByIdController, getOrdersController } from './orders.controller';

const ordersRoute = express.Router();

ordersRoute.get("/", authenticate, getOrdersController);
ordersRoute.get("/:orderId", authenticate, getOrdersByIdController);

export default ordersRoute;