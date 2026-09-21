import express from "express";
import { validate } from "../../middlewares/validation.middleware";
import {
  createProductSchema,
  createProductVariantSchema,
  updateProductImageSchema,
  updateProductStatusSchema,
} from "./products.validation";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  createProductController,
  createProductImageController,
  createProductVariantController,
  deleteProductController,
  deleteProductImagesController,
  getInventoryController,
  getProductImagesController,
  productListingsController,
  updateInventoryController,
  updateProductController,
  updateProductImagesController,
  updateProductStatusController,
} from "./products.controller";

const productRoutes = express.Router();
productRoutes.get("/", productListingsController);

productRoutes.get("/:productId/product-image", getProductImagesController);

productRoutes.post(
  "/",
  authenticate,
  validate(createProductSchema),
  createProductController,
);

productRoutes.patch(
  "/:productId/status",
  authenticate,
  validate(updateProductStatusSchema),
  updateProductStatusController,
);

productRoutes.patch("/:productId", authenticate, updateProductController);

productRoutes.delete("/:productId", authenticate, deleteProductController);

productRoutes.patch(
  "/:productId/product-image/:productImageId",
  authenticate,
  validate(updateProductImageSchema),
  updateProductImagesController,
);
productRoutes.delete(
  "/:productId/product-image/:productImageId",
  authenticate,
  deleteProductImagesController,
);

productRoutes.post(
  "/:productId/variants",
  authenticate,
  validate(createProductVariantSchema),
  createProductVariantController,
);
productRoutes.get(
  "/:variantId/inventory",
  authenticate,
  getInventoryController,
);
productRoutes.patch(
  "/:variantId/inventory",
  authenticate,
  updateInventoryController,
);
productRoutes.post(
  "/:productId/product-image",
  authenticate,
  createProductImageController,
);

export default productRoutes;
