"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const products_validation_1 = require("./products.validation");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const products_controller_1 = require("./products.controller");
const productRoutes = express_1.default.Router();
productRoutes.get("/", products_controller_1.productListingsController);
productRoutes.get("/:productId/product-image", products_controller_1.getProductImagesController);
productRoutes.post("/", auth_middleware_1.authenticate, (0, validation_middleware_1.validate)(products_validation_1.createProductSchema), products_controller_1.createProductController);
productRoutes.patch("/:productId/status", auth_middleware_1.authenticate, (0, validation_middleware_1.validate)(products_validation_1.updateProductStatusSchema), products_controller_1.updateProductStatusController);
productRoutes.patch("/:productId", auth_middleware_1.authenticate, products_controller_1.updateProductController);
productRoutes.delete("/:productId", auth_middleware_1.authenticate, products_controller_1.deleteProductController);
productRoutes.patch("/:productId/product-image/:productImageId", auth_middleware_1.authenticate, (0, validation_middleware_1.validate)(products_validation_1.updateProductImageSchema), products_controller_1.updateProductImagesController);
productRoutes.delete("/:productId/product-image/:productImageId", auth_middleware_1.authenticate, products_controller_1.deleteProductImagesController);
productRoutes.post("/:productId/variants", auth_middleware_1.authenticate, (0, validation_middleware_1.validate)(products_validation_1.createProductVariantSchema), products_controller_1.createProductVariantController);
productRoutes.get("/:variantId/inventory", auth_middleware_1.authenticate, products_controller_1.getInventoryController);
productRoutes.patch("/:variantId/inventory", auth_middleware_1.authenticate, products_controller_1.updateInventoryController);
productRoutes.post("/:productId/product-image", auth_middleware_1.authenticate, products_controller_1.createProductImageController);
exports.default = productRoutes;
//# sourceMappingURL=products.routes.js.map