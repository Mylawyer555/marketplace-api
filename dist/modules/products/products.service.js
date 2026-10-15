"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductStatusService = exports.deleteProductService = exports.updateProductService = exports.getProductListing = exports.deleteProductImageService = exports.updateProductImageService = exports.getProductImageService = exports.createProductImageService = exports.updateInventoryService = exports.getInventoryService = exports.createProductVariantService = exports.createProductService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../utils/AppError");
const auth_repository_1 = require("../auth/auth.repository");
const stores_repository_1 = require("../stores/stores.repository");
const products_repository_1 = require("./products.repository");
const createSlug_1 = require("../../utils/createSlug");
const db_1 = require("../../config/db");
const createProductService = async (sellerId, data) => {
    //authenticate user
    const user = await (0, auth_repository_1.findUserById)(sellerId);
    if (!user) {
        throw new AppError_1.AppError("User not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (user.role !== "SELLER") {
        throw new AppError_1.AppError("User must be a seller", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const store = await (0, stores_repository_1.findStoreBySellerId)(user.user_id);
    if (!store) {
        throw new AppError_1.AppError("oops!, seller must have a store in other to add products.", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    if (store.status !== "ACTIVE") {
        throw new AppError_1.AppError("Store is inactive, please activate your store to proceed.", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const isCategoryExist = await (0, products_repository_1.findCategoryById)(data.categoryId);
    if (!isCategoryExist) {
        throw new AppError_1.AppError("Category does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    const newSlug = (0, createSlug_1.generateSlug)(data.productName);
    const uniqueSlug = await (0, products_repository_1.findProductBySlug)(newSlug);
    if (uniqueSlug) {
        throw new AppError_1.AppError("Slug already exist", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    return await (0, products_repository_1.createProduct)(store.store_id, data, newSlug);
};
exports.createProductService = createProductService;
const createProductVariantService = async (sellerId, productId, data) => {
    //verify user
    const user = await (0, auth_repository_1.findUserById)(sellerId);
    if (!user) {
        throw new AppError_1.AppError("User does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    //check if user is seller
    if (user.role !== "SELLER") {
        throw new AppError_1.AppError("User must be a seller", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    //check does seller store exist?
    const store = await (0, stores_repository_1.findStoreBySellerId)(sellerId);
    if (!store) {
        throw new AppError_1.AppError("Seller must own a store to create product", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    if (store.status !== "ACTIVE") {
        throw new AppError_1.AppError("store is inactive, activate your store to proceed", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const product = await (0, products_repository_1.findProductById)(productId);
    if (!product) {
        throw new AppError_1.AppError("Product does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (product.store_id !== store.store_id) {
        throw new AppError_1.AppError("You are not authorized to add a variant to this product", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    return await (0, products_repository_1.createProductVariant)(product.product_id, data);
};
exports.createProductVariantService = createProductVariantService;
const getInventoryService = async (sellerId, variantId) => {
    const user = await (0, auth_repository_1.findUserById)(sellerId);
    if (!user) {
        throw new AppError_1.AppError("User does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (user.role !== "SELLER") {
        throw new AppError_1.AppError("user must be a seller", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const store = await (0, stores_repository_1.findStoreBySellerId)(sellerId);
    if (!store) {
        throw new AppError_1.AppError("seller must have a store to view inventory", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const variant = await (0, products_repository_1.findVariantWithProduct)(variantId);
    if (!variant) {
        throw new AppError_1.AppError("product and variant does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (store.store_id !== variant.product.store_id) {
        throw new AppError_1.AppError("You are not authorized to view this variant's inventory", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const inventory = await (0, products_repository_1.findInventoryByVariantId)(variantId);
    if (!inventory) {
        throw new AppError_1.AppError("Inventory does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    const availableQuantity = inventory.stock_quantity - inventory.reserved_quantity;
    return { ...inventory, availableQuantity };
};
exports.getInventoryService = getInventoryService;
const updateInventoryService = async (sellerId, variantId, data) => {
    const user = await (0, auth_repository_1.findUserById)(sellerId);
    if (!user) {
        throw new AppError_1.AppError("User does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (user.role !== "SELLER") {
        throw new AppError_1.AppError("user must be a seller", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const store = await (0, stores_repository_1.findStoreBySellerId)(sellerId);
    if (!store) {
        throw new AppError_1.AppError("seller must have a store to update inventory", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    if (store.status !== "ACTIVE") {
        throw new AppError_1.AppError("store must be active to update inventory", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const variant = await (0, products_repository_1.findVariantWithProduct)(variantId);
    if (!variant) {
        throw new AppError_1.AppError("product and variant does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (variant.product.store_id !== store.store_id) {
        throw new AppError_1.AppError("You're not authorized to update this variant's inventory", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const inventory = await (0, products_repository_1.findInventoryByVariantId)(variantId);
    if (!inventory) {
        throw new AppError_1.AppError("inventory does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (data.stockQuantity < inventory.reserved_quantity) {
        throw new AppError_1.AppError("stock quantity cannot be less than reserved quantity", http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    return await (0, products_repository_1.updatedInventory)(variantId, data.stockQuantity);
};
exports.updateInventoryService = updateInventoryService;
const createProductImageService = async (sellerId, productId, data) => {
    const user = await (0, auth_repository_1.findUserById)(sellerId);
    if (!user) {
        throw new AppError_1.AppError("user does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (user.role !== "SELLER") {
        throw new AppError_1.AppError("User must be a seller to add images", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const store = await (0, stores_repository_1.findStoreBySellerId)(sellerId);
    if (!store) {
        throw new AppError_1.AppError("Seller must have a store to add images", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    if (store.status !== "ACTIVE") {
        throw new AppError_1.AppError("seller's store must be active", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const product = await (0, products_repository_1.findProductById)(productId);
    if (!product) {
        throw new AppError_1.AppError("Product does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (product.store_id !== store.store_id) {
        throw new AppError_1.AppError("You're not authorized to add product image", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    return await (0, products_repository_1.createProductImage)(product.product_id, data);
};
exports.createProductImageService = createProductImageService;
const getProductImageService = async (productId) => {
    const product = await (0, products_repository_1.findProductById)(productId);
    if (!product) {
        throw new AppError_1.AppError("Product does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    return await (0, products_repository_1.getProductImages)(product.product_id);
};
exports.getProductImageService = getProductImageService;
const updateProductImageService = async (SellerId, productId, ProductImageId, data) => {
    const user = await (0, auth_repository_1.findUserById)(SellerId);
    if (!user) {
        throw new AppError_1.AppError("User does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (user.role !== "SELLER") {
        throw new AppError_1.AppError("user must be  a seller", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const store = await (0, stores_repository_1.findStoreBySellerId)(SellerId);
    if (!store) {
        throw new AppError_1.AppError("Seller must have a store to update images", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const product = await (0, products_repository_1.findProductById)(productId);
    if (!product) {
        throw new AppError_1.AppError("Product does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (product.store_id !== store.store_id) {
        throw new AppError_1.AppError("You're not authorized to perform this action", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const productImage = await (0, products_repository_1.findProductImage)(ProductImageId);
    if (!productImage) {
        throw new AppError_1.AppError("Image not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (productImage.product_id !== product.product_id) {
        throw new AppError_1.AppError("You're not permitted to perform image updates", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const updatedImages = await (0, products_repository_1.updateProductImages)(productImage.productimage_id, data);
    return updatedImages;
};
exports.updateProductImageService = updateProductImageService;
const deleteProductImageService = async (sellerId, productId, productImageId) => {
    const user = await (0, auth_repository_1.findUserById)(sellerId);
    if (!user) {
        throw new AppError_1.AppError("user does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (user.role !== "SELLER") {
        throw new AppError_1.AppError("User must be a seller", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const store = await (0, stores_repository_1.findStoreBySellerId)(sellerId);
    if (!store) {
        throw new AppError_1.AppError("Seller must have a store to delete image", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const product = await (0, products_repository_1.findProductById)(productId);
    if (!product) {
        throw new AppError_1.AppError("Product does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (store.store_id !== product.store_id) {
        throw new AppError_1.AppError("You're not authorized to perform this action", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const image = await (0, products_repository_1.findProductImage)(productImageId);
    if (!image) {
        throw new AppError_1.AppError("Image does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (image.product_id !== product.product_id) {
        throw new AppError_1.AppError("You are not permitted to perform this action", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    return await (0, products_repository_1.deleteProductImage)(image.productimage_id);
};
exports.deleteProductImageService = deleteProductImageService;
const getProductListing = async (queryParams) => {
    let { page = 1, limit = 20 } = queryParams;
    if (limit > 50)
        limit = 50;
    return await (0, products_repository_1.getProducts)(queryParams);
};
exports.getProductListing = getProductListing;
const updateProductService = async (sellerId, productId, data) => {
    const user = await (0, auth_repository_1.findUserById)(sellerId);
    if (!user) {
        throw new AppError_1.AppError("User does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (user.role !== "SELLER") {
        throw new AppError_1.AppError("user must be a seller", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const store = await (0, stores_repository_1.findStoreBySellerId)(sellerId);
    if (!store) {
        throw new AppError_1.AppError("seller must have a store", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    const product = await (0, products_repository_1.findProductById)(productId);
    if (!product) {
        throw new AppError_1.AppError("product does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (store.store_id !== product.store_id) {
        throw new AppError_1.AppError("You're not permitted to perform this action!", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    if (data.categoryId !== undefined) {
        const category = await (0, products_repository_1.findCategoryById)(data.categoryId);
        if (!category) {
            throw new AppError_1.AppError("category does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
        }
    }
    const updatedProduct = await (0, products_repository_1.updateProduct)(product.product_id, data);
    return updatedProduct;
};
exports.updateProductService = updateProductService;
const deleteProductService = async (sellerId, productId) => {
    const user = await (0, auth_repository_1.findUserById)(sellerId);
    if (!user) {
        throw new AppError_1.AppError("user does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (user.role !== "SELLER") {
        throw new AppError_1.AppError("user must be a seller", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const store = await (0, stores_repository_1.findStoreBySellerId)(sellerId);
    if (!store) {
        throw new AppError_1.AppError("seller must have a store", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const product = await (0, products_repository_1.findProductById)(productId);
    if (!product) {
        throw new AppError_1.AppError("Product does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (store.store_id !== product.store_id) {
        throw new AppError_1.AppError("You're not permitted to perform such action", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const orderHistory = await (0, products_repository_1.countOrderItemByProductId)(product.product_id);
    if (orderHistory > 0) {
        throw new AppError_1.AppError("Product cannot be deleted permanently because it has an order history", http_status_codes_1.StatusCodes.CONFLICT);
    }
    await db_1.db.$transaction(async (tx) => {
        await (0, products_repository_1.deleteWishlistByProductId)(tx, product.product_id);
        await (0, products_repository_1.deleteReviewsByProductId)(tx, productId);
        await (0, products_repository_1.cartItemByProductId)(tx, product.product_id);
        await (0, products_repository_1.deleteProduct)(tx, product.product_id);
    });
};
exports.deleteProductService = deleteProductService;
const updateProductStatusService = async (sellerId, productId, status) => {
    const user = await (0, auth_repository_1.findUserById)(sellerId);
    if (!user) {
        throw new AppError_1.AppError("user does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (user.role !== "SELLER") {
        throw new AppError_1.AppError("user must be a seller", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const store = await (0, stores_repository_1.findStoreBySellerId)(sellerId);
    if (!store) {
        throw new AppError_1.AppError("seller must have a store", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const product = await (0, products_repository_1.findProductForStatusUpdate)(productId);
    if (!product) {
        throw new AppError_1.AppError("Product does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (store.store_id !== product.store_id) {
        throw new AppError_1.AppError("You're not permitted to perform such action", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    if (product.status === status.status) {
        throw new AppError_1.AppError(`Product is already ${status.status}`, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    //transition rule
    const allowedTransitions = {
        DRAFT: ["ACTIVE"],
        ACTIVE: ["DISABLED", "ARCHIVED"],
        DISABLED: ["ACTIVE"],
        ARCHIVED: []
    };
    const allowedStatuses = allowedTransitions[product.status];
    if (!allowedStatuses.includes(status.status)) {
        throw new AppError_1.AppError(`Cannot change ${product.status} to ${status.status}`, http_status_codes_1.StatusCodes.BAD_REQUEST);
    }
    ;
    if (status.status === "ACTIVE") {
        if (product.variants.length === 0) {
            throw new AppError_1.AppError("Product must have atleast 1 varaint", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        if (product.images.length === 0) {
            throw new AppError_1.AppError("Product must have atleast 1 image", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        const hasMissingInventory = product.variants.some((variant) => !variant.inventory);
        if (hasMissingInventory) {
            throw new AppError_1.AppError("Every product must have inventory", http_status_codes_1.StatusCodes.BAD_REQUEST);
        }
        ;
    }
    return await (0, products_repository_1.updateProductStatus)(product.product_id, status);
};
exports.updateProductStatusService = updateProductStatusService;
//# sourceMappingURL=products.service.js.map