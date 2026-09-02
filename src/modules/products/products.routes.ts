import express from 'express'
import { validate } from '../../middlewares/validation.middleware';
import { createProductSchema, createProductVariantSchema } from './products.validation';
import { authenticate } from '../../middlewares/auth.middleware';
import { createProductController, createProductImageController, createProductVariantController, getInventoryController, updateInventoryController } from './products.controller';

const productRoutes = express.Router();

productRoutes.post("/",  authenticate, validate(createProductSchema), createProductController);
productRoutes.post("/:productId/variants",  authenticate, validate(createProductVariantSchema), createProductVariantController);
productRoutes.get("/:variantId/inventory", authenticate, getInventoryController);
productRoutes.patch("/:variantId/inventory", authenticate, updateInventoryController);
productRoutes.post("/:productId/product-image", authenticate, createProductImageController);

export default productRoutes