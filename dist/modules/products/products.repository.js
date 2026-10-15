"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findProductForStatusUpdate = exports.updateProductStatus = exports.countOrderItemByProductId = exports.cartItemByProductId = exports.deleteReviewsByProductId = exports.deleteWishlistByProductId = exports.deleteProduct = exports.updateProduct = exports.getProducts = exports.deleteProductImage = exports.updateProductImages = exports.findProductImage = exports.getProductImages = exports.createProductImage = exports.updatedInventory = exports.findVariantWithProduct = exports.findInventoryByVariantId = exports.createProductVariant = exports.findProductById = exports.findCategoryById = exports.findProductBySlug = exports.createProduct = void 0;
const db_1 = require("../../config/db");
const createProduct = async (storeId, data, slug) => {
    return db_1.db.product.create({
        data: {
            store_id: storeId,
            product_name: data.productName,
            description: data.description,
            category_id: data.categoryId,
            metadata: data.metadata,
            slug,
        },
    });
};
exports.createProduct = createProduct;
const findProductBySlug = async (slug) => {
    return db_1.db.product.findUnique({
        where: {
            slug,
        },
    });
};
exports.findProductBySlug = findProductBySlug;
const findCategoryById = async (categoryId) => {
    return db_1.db.category.findUnique({
        where: {
            category_id: categoryId,
        },
    });
};
exports.findCategoryById = findCategoryById;
const findProductById = async (productId) => {
    return db_1.db.product.findUnique({
        where: {
            product_id: productId,
        },
    });
};
exports.findProductById = findProductById;
const createProductVariant = async (productId, data) => {
    return db_1.db.$transaction(async (tx) => {
        const variant = await tx.productVariant.create({
            data: {
                product_id: productId,
                sku: data.sku,
                color: data.color,
                price: data.price,
                variant_storage: data.variantStorage ?? null,
            },
        });
        await tx.inventory.create({
            data: {
                variant_id: variant.variant_id,
                stock_quantity: data.stockQuantity,
            },
        });
        return variant;
    });
};
exports.createProductVariant = createProductVariant;
const findInventoryByVariantId = async (variantId) => {
    return db_1.db.inventory.findUnique({
        where: {
            variant_id: variantId,
        },
    });
};
exports.findInventoryByVariantId = findInventoryByVariantId;
const findVariantWithProduct = async (variantId) => {
    return db_1.db.productVariant.findUnique({
        where: {
            variant_id: variantId,
        },
        select: {
            product_id: true,
            variant_id: true,
            product: {
                select: {
                    product_id: true,
                    store_id: true,
                },
            },
        },
    });
};
exports.findVariantWithProduct = findVariantWithProduct;
const updatedInventory = async (variantId, stockQuantity) => {
    return db_1.db.inventory.update({
        where: {
            variant_id: variantId,
        },
        data: {
            stock_quantity: stockQuantity,
        },
    });
};
exports.updatedInventory = updatedInventory;
const createProductImage = async (productId, data) => {
    return db_1.db.$transaction(async (tx) => {
        const imageCount = await tx.productImage.count({
            where: {
                product_id: productId,
            },
        });
        const shouldBePrimary = imageCount === 0 || data.isPrimary === true;
        if (shouldBePrimary) {
            await tx.productImage.updateMany({
                where: {
                    product_id: productId,
                    is_primary: true,
                },
                data: {
                    is_primary: false,
                },
            });
        }
        const productImage = await tx.productImage.create({
            data: {
                product_id: productId,
                image_url: data.imageUrl,
                is_primary: shouldBePrimary,
                ...(data.displayOrder !== undefined && {
                    display_order: data.displayOrder,
                }),
            },
        });
        return productImage;
    });
};
exports.createProductImage = createProductImage;
const getProductImages = async (productId) => {
    return db_1.db.productImage.findMany({
        where: {
            product_id: productId,
        },
        orderBy: {
            display_order: "asc",
        },
    });
};
exports.getProductImages = getProductImages;
const findProductImage = async (imageId) => {
    return db_1.db.productImage.findUnique({
        where: {
            productimage_id: imageId,
        },
    });
};
exports.findProductImage = findProductImage;
const updateProductImages = async (ProductImageId, data) => {
    return db_1.db.$transaction(async (tx) => {
        const updatedImages = await tx.productImage.update({
            where: {
                productimage_id: ProductImageId,
            },
            data: {
                ...(data.imageUrl !== undefined && { image_url: data.imageUrl }),
                ...(data.isPrimary !== undefined && { is_primary: data.isPrimary }),
                ...(data.displayOrder !== undefined && {
                    display_order: data.displayOrder,
                }),
            },
        });
        return updatedImages;
    });
};
exports.updateProductImages = updateProductImages;
const deleteProductImage = async (productImageId) => {
    return db_1.db.$transaction(async (tx) => {
        const image = await tx.productImage.findUnique({
            where: {
                productimage_id: productImageId,
            },
        });
        if (image?.is_primary) {
            const nextImage = await tx.productImage.findFirst({
                where: {
                    product_id: image.product_id,
                    NOT: {
                        productimage_id: productImageId,
                    },
                },
                orderBy: {
                    display_order: "asc",
                },
            });
            if (nextImage) {
                await tx.productImage.update({
                    where: {
                        productimage_id: nextImage.productimage_id,
                    },
                    data: {
                        is_primary: true,
                    },
                });
            }
        }
        return tx.productImage.delete({
            where: {
                productimage_id: productImageId,
            },
        });
    });
};
exports.deleteProductImage = deleteProductImage;
const getProducts = async (query) => {
    const { search, categoryId, minPrice, maxPrice, sortBy, sortOrder, page = 1, limit = 20, } = query;
    const where = {
        ...(search && {
            product_name: {
                contains: search,
                mode: "insensitive",
            },
        }),
        ...(categoryId && {
            category_id: categoryId,
        }),
        ...(minPrice !== undefined || maxPrice !== undefined
            ? {
                price: {
                    ...(minPrice !== undefined && { gte: minPrice }),
                    ...(maxPrice !== undefined && { lte: maxPrice }),
                },
            }
            : {}),
    };
    const orderBy = sortBy
        ? {
            [sortBy === "createdAt" ? "created_at" : sortBy]: sortOrder ?? "desc",
        }
        : {
            created_at: "desc",
        };
    const skip = (page - 1) * limit;
    const products = await db_1.db.product.findMany({
        where,
        orderBy,
        skip,
        take: limit,
    });
    const total = await db_1.db.product.count({
        where,
    });
    return {
        products,
        total,
        pagination: {
            page,
            limit,
            totalPages: Math.ceil(total / limit),
        },
    };
};
exports.getProducts = getProducts;
const updateProduct = async (productId, data) => {
    return db_1.db.product.update({
        where: {
            product_id: productId,
        },
        data: {
            ...(data.productName !== undefined && { product_name: data.productName }),
            ...(data.description !== undefined && { description: data.description }),
            ...(data.metadata !== undefined && {
                metadata: data.metadata,
            }),
            ...(data.categoryId !== undefined && {
                category: {
                    connect: {
                        category_id: data.categoryId,
                    },
                },
            }),
        },
    });
};
exports.updateProduct = updateProduct;
const deleteProduct = async (tx, productId) => {
    return db_1.db.product.delete({
        where: {
            product_id: productId,
        },
    });
};
exports.deleteProduct = deleteProduct;
const deleteWishlistByProductId = async (tx, productId) => {
    return db_1.db.wishlist.deleteMany({
        where: {
            product_id: productId,
        },
    });
};
exports.deleteWishlistByProductId = deleteWishlistByProductId;
const deleteReviewsByProductId = async (tx, productId) => {
    return db_1.db.review.deleteMany({
        where: {
            product_id: productId,
        },
    });
};
exports.deleteReviewsByProductId = deleteReviewsByProductId;
const cartItemByProductId = async (tx, productId) => {
    return db_1.db.cartItem.deleteMany({
        where: {
            variant: {
                product_id: productId,
            },
        },
    });
};
exports.cartItemByProductId = cartItemByProductId;
const countOrderItemByProductId = async (productId) => {
    return db_1.db.orderItem.count({
        where: {
            product_id: productId,
        },
    });
};
exports.countOrderItemByProductId = countOrderItemByProductId;
const updateProductStatus = async (productId, status) => {
    return db_1.db.product.update({
        where: {
            product_id: productId,
        },
        data: {
            status: status.status
        }
    });
};
exports.updateProductStatus = updateProductStatus;
const findProductForStatusUpdate = async (productId) => {
    return db_1.db.product.findUnique({
        where: {
            product_id: productId
        },
        include: {
            variants: {
                select: {
                    inventory: true,
                },
            },
            images: true,
        },
    });
};
exports.findProductForStatusUpdate = findProductForStatusUpdate;
//# sourceMappingURL=products.repository.js.map