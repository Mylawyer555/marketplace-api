import { db } from "../../config/db";
import {
  CreateProduct,
  CreateProductImages,
  CreateProductVariant,
} from "./products.type";

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

export const getProductImages = async (productId:number) => {
    return db.productImage.findMany({
        where: {
            product_id: productId
        },
        orderBy: {
            display_order: "asc"
        }
    });
};