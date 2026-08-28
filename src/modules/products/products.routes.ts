import express from 'express'
import { validate } from '../../middlewares/validation.middleware';
import { createProductSchema, createProductVariantSchema } from './products.validation';
import { authenticate } from '../../middlewares/auth.middleware';
import { createProductController, createProductVariantController } from './products.controller';

const productRoutes = express.Router();

productRoutes.post("/",  authenticate, validate(createProductSchema), createProductController);
productRoutes.post("/:productId/variants",  authenticate, validate(createProductVariantSchema), createProductVariantController);

export default productRoutes