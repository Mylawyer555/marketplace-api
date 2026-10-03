import express from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { createPaymentController, processPaymentController } from './payments.controller';

const paymentRoutes = express.Router();

paymentRoutes.post("/:orderId", authenticate, createPaymentController);
paymentRoutes.post(
  "/:paymentId/process",
  authenticate,
  processPaymentController,
);;

export default paymentRoutes