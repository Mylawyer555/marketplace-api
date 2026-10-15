"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const stores_controller_1 = require("./stores.controller");
const storeRoutes = express_1.default.Router();
storeRoutes.post("/", auth_middleware_1.authenticate, stores_controller_1.createStoreController);
storeRoutes.get("/me", auth_middleware_1.authenticate, stores_controller_1.getMyStoreController);
storeRoutes.patch("/me", auth_middleware_1.authenticate, stores_controller_1.updateStoreController);
exports.default = storeRoutes;
//# sourceMappingURL=stores.route.js.map