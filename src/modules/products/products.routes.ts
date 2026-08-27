import express from 'express'
import { validate } from '../../middlewares/validation.middleware';
import { createProductSchema } from './products.validation';
import { authenticate } from '../../middlewares/auth.middleware';
import { createProductController } from './products.controller';

const productRoutes = express.Router();

productRoutes.post("/",  authenticate, validate(createProductSchema), createProductController);

export default productRoutes