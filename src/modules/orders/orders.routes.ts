import express from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { getOrdersByIdController, getOrdersController, orderCancellationController, orderStatusTransitionController } from './orders.controller';

const ordersRoute = express.Router();

ordersRoute.get("/", authenticate, getOrdersController);
ordersRoute.get("/:orderId", authenticate, getOrdersByIdController);
ordersRoute.patch("/:orderId/status", authenticate, orderStatusTransitionController);
ordersRoute.patch("/:orderId/cancel", authenticate, orderCancellationController);

export default ordersRoute;