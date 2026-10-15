"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const sellers_controller_1 = require("./sellers.controller");
const sellerRoutes = express_1.default.Router();
sellerRoutes.post("/become-seller", auth_middleware_1.authenticate, sellers_controller_1.becomeSellerController);
exports.default = sellerRoutes;
//# sourceMappingURL=sellers.route.js.map