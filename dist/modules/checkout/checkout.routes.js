"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const checkout_controller_1 = require("./checkout.controller");
const checkoutRoute = express_1.default.Router();
checkoutRoute.post("/", auth_middleware_1.authenticate, checkout_controller_1.checkoutController);
exports.default = checkoutRoute;
//# sourceMappingURL=checkout.routes.js.map