import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import {
  createProductImageService,
  createProductService,
  createProductVariantService,
  getInventoryService,
  getProductImageService,
  updateInventoryService,
} from "./products.service";

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate user!", StatusCodes.UNAUTHORIZED);
    }

    const sellerId = req.user.userId;
    const data = req.body;
    const product = await createProductService(sellerId, data);
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Product created successfully",
      data: product,
    });
  } catch (error) {
    next(error);
  }
};

export const createProductVariantController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
    }

    const sellerId = req.user.userId;
    const productId = Number(req.params.productId);
    const data = req.body;
    const variant = await createProductVariantService(
      sellerId,
      productId,
      data,
    );
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "variant created!",
      data: variant,
    });
  } catch (error) {
    next(error);
  }
};

export const getInventoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
    }

    const sellerId = req.user.userId;
    const variantId = Number(req.params.variantId);
    const inventory = await getInventoryService(sellerId, variantId);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Inventory retrieved successfully",
      data: inventory,
    });
  } catch (error) {
    next(error);
  }
};
export const updateInventoryController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
    }

    const sellerId = req.user.userId;
    const variantId = Number(req.params.variantId);
    const data = req.body;
    const inventoryUpdate = await updateInventoryService(
      sellerId,
      variantId,
      data,
    );
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Inventory updated successfully",
      data: inventoryUpdate,
    });
  } catch (error) {
    next(error);
  }
};
export const createProductImageController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
    }

    const sellerId = req.user.userId;
    const productId = Number(req.params.productId);
    const data = req.body;
    const productImage = await createProductImageService(
      sellerId,
      productId,
      data,
    );
    res.status(StatusCodes.CREATED).json({
      success: true,
      message: "Image added successfully",
      data: productImage,
    });
  } catch (error) {
    next(error);
  }
};
export const getProductImagesController = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const productId = Number(req.params.productId);
    const productImage = await getProductImageService(productId);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Images retrieved successfully",
      data: productImage,
    });
  } catch (error) {
    next(error);
  }
};
