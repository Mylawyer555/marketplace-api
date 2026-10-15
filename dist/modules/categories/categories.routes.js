"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const categories_controller_1 = require("./categories.controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const categories_validation_1 = require("./categories.validation");
const categoryRoutes = express_1.default.Router();
categoryRoutes.post("/", auth_middleware_1.authenticate, (0, validation_middleware_1.validate)(categories_validation_1.createCategorySchema), categories_controller_1.createCategoryController);
categoryRoutes.get("/:categoryId", categories_controller_1.getCategoryController);
exports.default = categoryRoutes;
//# sourceMappingURL=categories.routes.js.map