import { STATUS_CODES } from "http";
import { db } from "../../config/db";
import { AppError } from "../../utils/AppError";
import {
  CreateProduct,
  CreateProductImages,
  CreateProductVariant,
  ProductQuery,
  UpdateProduct,
  UpdateProductImages,
} from "./products.type";
import { StatusCodes } from "http-status-codes";
import { Prisma } from "../../generated/prisma/client";

export const createProduct = async (
  storeId: number,
  data: CreateProduct,
  slug: string,
) => {
  return db.product.create({
    data: {
      store_id: storeId,
      product_name: data.productName,
      description: data.description,
      category_id: data.categoryId,
      slug,
    },
  });
};

export const findProductBySlug = async (slug: string) => {
  return db.product.findUnique({
    where: {
      slug,
    },
  });
};

export const findCategoryById = async (categoryId: number) => {
  return db.category.findUnique({
    where: {
      category_id: categoryId,
    },
  });
};

export const findProductById = async (productId: number) => {
  return db.product.findUnique({
    where: {
      product_id: productId,
    },
  });
};

export const createProductVariant = async (
  productId: number,
  data: CreateProductVariant,
) => {
  return db.$transaction(async (tx) => {
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

export const findInventoryByVariantId = async (variantId: number) => {
  return db.inventory.findUnique({
    where: {
      variant_id: variantId,
    },
  });
};

export const findVariantWithProduct = async (variantId: number) => {
  return db.productVariant.findUnique({
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

export const updatedInventory = async (
  variantId: number,
  stockQuantity: number,
) => {
  return db.inventory.update({
    where: {
      variant_id: variantId,
    },
    data: {
      stock_quantity: stockQuantity,
    },
  });
};

export const createProductImage = async (
  productId: number,
  data: CreateProductImages,
) => {
  return db.$transaction(async (tx) => {
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

export const getProductImages = async (productId: number) => {
  return db.productImage.findMany({
    where: {
      product_id: productId,
    },
    orderBy: {
      display_order: "asc",
    },
  });
};

export const findProductImage = async (imageId: number) => {
  return db.productImage.findUnique({
    where: {
      productimage_id: imageId,
    },
  });
};

export const updateProductImages = async (
  ProductImageId: number,
  data: UpdateProductImages,
) => {
  return db.$transaction(async (tx) => {
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

export const deleteProductImage = async (productImageId: number) => {
  return db.$transaction(async (tx) => {
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

export const getProducts = async (query: ProductQuery) => {
  const {
    search,
    categoryId,
    minPrice,
    maxPrice,
    sortBy,
    sortOrder,
    page = 1,
    limit = 20,
  } = query;

  const where = {
    ...(search && {
      product_name: {
        contains: search,
        mode: "insensitive" as const,
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
        created_at: "desc" as const,
      };

  const skip = (page - 1) * limit;

  const products = await db.product.findMany({
    where,
    orderBy,
    skip,
    take: limit,
  });

  const total = await db.product.count({
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

export const updateProduct = async (productId: number, data: UpdateProduct) => {
  return db.product.update({
    where: {
      product_id: productId,
    },
    data: {
      ...(data.productName !== undefined && { product_name: data.productName }),
      ...(data.description !== undefined && { description: data.description }),
      ...(data.metadata !== undefined && {
        metadata: data.metadata as Prisma.InputJsonValue,
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

export const deleteProduct = async (
  tx: Prisma.TransactionClient,
  productId: number,
) => {
  return db.product.delete({
    where: {
      product_id: productId,
    },
  });
};

export const deleteWishlistByProductId = async (
  tx: Prisma.TransactionClient,
  productId: number,
) => {
  return db.wishlist.deleteMany({
    where: {
      product_id: productId,
    },
  });
};

export const deleteReviewsByProductId = async (
  tx: Prisma.TransactionClient,
  productId: number,
) => {
  return db.review.deleteMany({
    where: {
      product_id: productId,
    },
  });
};

export const cartItemByProductId = async (
  tx: Prisma.TransactionClient,
  productId: number,
) => {
  return db.cartItem.deleteMany({
    where: {
      variant: {
        product_id: productId,
      },
    },
  });
};

export const countOrderItemByProductId = async (productId: number) => {
  return db.orderItem.count({
    where: {
      product_id: productId,
    },
  });
};
