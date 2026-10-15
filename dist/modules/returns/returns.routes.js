"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const returns_controller_1 = require("./returns.controller");
const returnsRoute = express_1.default.Router();
returnsRoute.post("/:orderItemId", auth_middleware_1.authenticate, returns_controller_1.returnsController);
returnsRoute.patch("/:returnId/status", auth_middleware_1.authenticate, returns_controller_1.returnStatusTransitionController);
exports.default = returnsRoute;
//# sourceMappingURL=returns.routes.js.map