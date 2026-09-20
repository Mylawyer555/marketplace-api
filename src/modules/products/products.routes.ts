import express from "express";
import { validate } from "../../middlewares/validation.middleware";
import {
  createProductSchema,
  createProductVariantSchema,
  updateProductImageSchema,
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
} from "./products.controller";

const productRoutes = express.Router();

productRoutes.post(
  "/",
  authenticate,
  validate(createProductSchema),
  createProductController,
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
productRoutes.get("/:productId/product-image", getProductImagesController);

productRoutes.patch(
  "/:productId/product-image/:productImageId",
  validate(updateProductImageSchema),
  authenticate,
  updateProductImagesController,
);

productRoutes.delete(
  "/:productId/product-image/:productImageId",
  authenticate,
  deleteProductImagesController,
);

productRoutes.get("/products", productListingsController);

productRoutes.patch("/:productId", authenticate, updateProductController);

productRoutes.delete("/:productId", authenticate, deleteProductController);

export default productRoutes;
