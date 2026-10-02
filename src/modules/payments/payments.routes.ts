import express from 'express';
import { authenticate } from '../../middlewares/auth.middleware';
import { createPaymentController } from './payments.controller';

const paymentRoutes = express.Router();

paymentRoutes.post("/:orderId", authenticate, createPaymentController);

export default paymentRoutes