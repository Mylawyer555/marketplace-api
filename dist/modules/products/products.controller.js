"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductStatusController = exports.deleteProductController = exports.updateProductController = exports.productListingsController = exports.deleteProductImagesController = exports.updateProductImagesController = exports.getProductImagesController = exports.createProductImageController = exports.updateInventoryController = exports.getInventoryController = exports.createProductVariantController = exports.createProductController = void 0;
const AppError_1 = require("../../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const products_service_1 = require("./products.service");
const products_validation_1 = require("./products.validation");
const createProductController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user!", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const sellerId = req.user.userId;
        const data = req.body;
        const product = await (0, products_service_1.createProductService)(sellerId, data);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createProductController = createProductController;
const createProductVariantController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const sellerId = req.user.userId;
        const productId = Number(req.params.productId);
        const data = req.body;
        const variant = await (0, products_service_1.createProductVariantService)(sellerId, productId, data);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            message: "variant created!",
            data: variant,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createProductVariantController = createProductVariantController;
const getInventoryController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const sellerId = req.user.userId;
        const variantId = Number(req.params.variantId);
        const inventory = await (0, products_service_1.getInventoryService)(sellerId, variantId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Inventory retrieved successfully",
            data: inventory,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getInventoryController = getInventoryController;
const updateInventoryController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const sellerId = req.user.userId;
        const variantId = Number(req.params.variantId);
        const data = req.body;
        const inventoryUpdate = await (0, products_service_1.updateInventoryService)(sellerId, variantId, data);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Inventory updated successfully",
            data: inventoryUpdate,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateInventoryController = updateInventoryController;
const createProductImageController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const sellerId = req.user.userId;
        const productId = Number(req.params.productId);
        const data = req.body;
        const productImage = await (0, products_service_1.createProductImageService)(sellerId, productId, data);
        res.status(http_status_codes_1.StatusCodes.CREATED).json({
            success: true,
            message: "Image added successfully",
            data: productImage,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.createProductImageController = createProductImageController;
const getProductImagesController = async (req, res, next) => {
    try {
        const productId = Number(req.params.productId);
        const productImage = await (0, products_service_1.getProductImageService)(productId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Images retrieved successfully",
            data: productImage,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getProductImagesController = getProductImagesController;
const updateProductImagesController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const sellerId = req.user.userId;
        const productId = Number(req.params.productId);
        const imageId = Number(req.params.productImageId);
        const data = req.body;
        const productImageUpdate = await (0, products_service_1.updateProductImageService)(sellerId, productId, imageId, data);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Image updated successfully",
            data: productImageUpdate,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProductImagesController = updateProductImagesController;
const deleteProductImagesController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const sellerId = req.user.userId;
        const productId = Number(req.params.productId);
        const imageId = Number(req.params.productImageId);
        const deletedImage = await (0, products_service_1.deleteProductImageService)(sellerId, productId, imageId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Image deleted successfully",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProductImagesController = deleteProductImagesController;
const productListingsController = async (req, res, next) => {
    try {
        const parsed = products_validation_1.getProductschema.safeParse(req.query);
        if (!parsed.success) {
            return res.status(400).json({
                message: "Invalid query parameters",
                errors: parsed.error,
            });
        }
        const result = await (0, products_service_1.getProductListing)(parsed.data);
        return res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.productListingsController = productListingsController;
const updateProductController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("authenticate user!", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const sellerId = Number(req.user.userId);
        const productId = Number(req.params.productId);
        const data = req.body;
        const result = await (0, products_service_1.updateProductService)(sellerId, productId, data);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProductController = updateProductController;
const deleteProductController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("authenticate user!", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const sellerId = Number(req.user.userId);
        const productId = Number(req.params.productId);
        const deleted = await (0, products_service_1.deleteProductService)(sellerId, productId);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Product deleted successfully!",
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteProductController = deleteProductController;
const updateProductStatusController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("authenticate user!", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const sellerId = Number(req.user.userId);
        const productId = Number(req.params.productId);
        const status = req.body;
        const statusUpdate = await (0, products_service_1.updateProductStatusService)(sellerId, productId, status);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Product status updated successfully!",
            data: statusUpdate
        });
    }
    catch (error) {
        next(error);
    }
};
exports.updateProductStatusController = updateProductStatusController;
//# sourceMappingURL=products.controller.js.map