import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  createPaymentController,
  failPaymentController,
  processPaymentController,
  refundPaymentController,
} from "./payments.controller";
import { authorize } from "../../middlewares/authorize.middleware";

const paymentRoutes = express.Router();

paymentRoutes.post("/:orderId", authenticate, createPaymentController);
paymentRoutes.post(
  "/:paymentId/process",
  authenticate,
  authorize("ADMIN"),
  processPaymentController,
);
paymentRoutes.post("/:paymentId/fail", authenticate, authorize("ADMIN"),failPaymentController);
paymentRoutes.post("/:paymentId/refund", authenticate, authorize("ADMIN"),refundPaymentController);

export default paymentRoutes;
