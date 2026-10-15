"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const cart_controllers_1 = require("./cart.controllers");
const cartRoutes = express_1.default.Router();
cartRoutes.post("/items", auth_middleware_1.authenticate, cart_controllers_1.addToCartController);
cartRoutes.get("/", auth_middleware_1.authenticate, cart_controllers_1.getCartController);
cartRoutes.patch("/items/:cartItemId", auth_middleware_1.authenticate, cart_controllers_1.updateCartQuantityController);
cartRoutes.delete("/items/:cartItemId", auth_middleware_1.authenticate, cart_controllers_1.removeCartItemController);
cartRoutes.delete("/items/", auth_middleware_1.authenticate, cart_controllers_1.clearCartController);
exports.default = cartRoutes;
//# sourceMappingURL=cart.routes.js.map