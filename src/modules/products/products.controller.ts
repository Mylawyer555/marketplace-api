import { Request, Response, NextFunction } from "express";
import { AppError } from "../../utils/AppError";
import { StatusCodes } from "http-status-codes";
import {
  createProductImageService,
  createProductService,
  createProductVariantService,
  deleteProductImageService,
  deleteProductService,
  getInventoryService,
  getProductImageService,
  getProductListing,
  updateInventoryService,
  updateProductImageService,
  updateProductService,
  updateProductStatusService,
} from "./products.service";
import { getProductschema } from "./products.validation";

export const createProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
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
  next: NextFunction
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
      data
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
  next: NextFunction
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
  next: NextFunction
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
      data
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
  next: NextFunction
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
      data
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
  next: NextFunction
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

export const updateProductImagesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
    }

    const sellerId = req.user.userId;
    const productId = Number(req.params.productId);
    const imageId = Number(req.params.productImageId);
    const data = req.body;

    const productImageUpdate = await updateProductImageService(
      sellerId,
      productId,
      imageId,
      data
    );
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Image updated successfully",
      data: productImageUpdate,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteProductImagesController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("Authenticate user", StatusCodes.UNAUTHORIZED);
    }

    const sellerId = req.user.userId;
    const productId = Number(req.params.productId);
    const imageId = Number(req.params.productImageId);

    const deletedImage = await deleteProductImageService(
      sellerId,
      productId,
      imageId
    );
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Image deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
export const productListingsController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const parsed = getProductschema.safeParse(req.query);

    if (!parsed.success) {
      return res.status(400).json({
        message: "Invalid query parameters",
        errors: parsed.error,
      });
    }

    const result = await getProductListing(parsed.data);
    return res.status(StatusCodes.OK).json({
      success: true,
      result,
    });
  } catch (error) {
    next(error);
  }
};

export const updateProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("authenticate user!", StatusCodes.UNAUTHORIZED);
    }

    const sellerId = Number(req.user.userId);
    const productId = Number(req.params.productId);
    const data = req.body;

    const result = await updateProductService(
      sellerId,
      productId,
      data
    );
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};
export const deleteProductController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("authenticate user!", StatusCodes.UNAUTHORIZED);
    }

    const sellerId = Number(req.user.userId);
    const productId = Number(req.params.productId);
   

    const deleted = await deleteProductService(sellerId, productId)
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Product deleted successfully!",
    });
  } catch (error) {
    next(error);
  }
};
export const updateProductStatusController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) {
      throw new AppError("authenticate user!", StatusCodes.UNAUTHORIZED);
    }

    const sellerId = Number(req.user.userId);
    const productId = Number(req.params.productId);
    const status = req.body
   

    const statusUpdate = await updateProductStatusService(sellerId, productId, status);
    res.status(StatusCodes.OK).json({
      success: true,
      message: "Product status updated successfully!",
      data: statusUpdate
    });
  } catch (error) {
    next(error);
  }
};
