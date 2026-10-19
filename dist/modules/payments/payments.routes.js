"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const payments_controller_1 = require("./payments.controller");
const authorize_middleware_1 = require("../../middlewares/authorize.middleware");
const paymentRoutes = express_1.default.Router();
paymentRoutes.post("/:orderId", auth_middleware_1.authenticate, payments_controller_1.createPaymentController);
paymentRoutes.post("/:paymentId/process", auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)("ADMIN"), payments_controller_1.processPaymentController);
paymentRoutes.post("/:paymentId/fail", auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)("ADMIN"), payments_controller_1.failPaymentController);
paymentRoutes.post("/:paymentId/refund", auth_middleware_1.authenticate, (0, authorize_middleware_1.authorize)("ADMIN"), payments_controller_1.refundPaymentController);
exports.default = paymentRoutes;
//# sourceMappingURL=payments.routes.js.map