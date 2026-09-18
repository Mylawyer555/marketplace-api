import express from "express";
import { authenticate } from "../../middlewares/auth.middleware";
import {
  createCategoryController,
  getCategoryController,
} from "./categories.controller";
import { validate } from "../../middlewares/validation.middleware";
import { createCategorySchema } from "./categories.validation";

const categoryRoutes = express.Router();

categoryRoutes.post("/", authenticate, validate(createCategorySchema), createCategoryController);

categoryRoutes.get("/:categoryId", getCategoryController);

export default categoryRoutes