import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  createPaymentController,
  failPaymentController,
  processPaymentController,
  refundPaymentController,
} from "./payments.controller";

const paymentRoutes = express.Router();

paymentRoutes.post("/:orderId", authenticate, createPaymentController);
paymentRoutes.post(
  "/:paymentId/process",
  authenticate,
  processPaymentController,
);
paymentRoutes.post("/:paymentId/fail", authenticate, failPaymentController);
paymentRoutes.post("/:paymentId/refund", authenticate, refundPaymentController);

export default paymentRoutes;
