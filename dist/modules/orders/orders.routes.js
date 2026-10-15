"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const orders_controller_1 = require("./orders.controller");
const ordersRoute = express_1.default.Router();
ordersRoute.get("/", auth_middleware_1.authenticate, orders_controller_1.getOrdersController);
ordersRoute.get("/:orderId", auth_middleware_1.authenticate, orders_controller_1.getOrdersByIdController);
ordersRoute.patch("/:orderId/status", auth_middleware_1.authenticate, orders_controller_1.orderStatusTransitionController);
ordersRoute.patch("/:orderId/cancel", auth_middleware_1.authenticate, orders_controller_1.orderCancellationController);
exports.default = ordersRoute;
//# sourceMappingURL=orders.routes.js.map