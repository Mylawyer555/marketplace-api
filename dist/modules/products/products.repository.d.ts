import { CreateProduct, CreateProductImages, CreateProductVariant, ProductQuery, UpdateProduct, UpdateProductImages, UpdateProductStatus } from "./products.type";
import { Prisma } from "../../generated/prisma/client";
export declare const createProduct: (storeId: number, data: CreateProduct, slug: string) => Promise<{
    product_id: number;
    product_name: string;
    description: string;
    slug: string;
    status: import("../../generated/prisma/enums").product_status;
    category_id: number | null;
    store_id: number;
    metadata: import("@prisma/client/runtime/client").JsonValue | null;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const findProductBySlug: (slug: string) => Promise<{
    product_id: number;
    product_name: string;
    description: string;
    slug: string;
    status: import("../../generated/prisma/enums").product_status;
    category_id: number | null;
    store_id: number;
    metadata: import("@prisma/client/runtime/client").JsonValue | null;
    created_at: Date | null;
    updated_at: Date | null;
} | null>;
export declare const findCategoryById: (categoryId: number) => Promise<{
    category_id: number;
    category_name: string;
    created_at: Date | null;
    updated_at: Date | null;
} | null>;
export declare const findProductById: (productId: number) => Promise<{
    product_id: number;
    product_name: string;
    description: string;
    slug: string;
    status: import("../../generated/prisma/enums").product_status;
    category_id: number | null;
    store_id: number;
    metadata: import("@prisma/client/runtime/client").JsonValue | null;
    created_at: Date | null;
    updated_at: Date | null;
} | null>;
export declare const createProductVariant: (productId: number, data: CreateProductVariant) => Promise<{
    variant_id: number;
    product_id: number;
    sku: string;
    color: string;
    variant_storage: string | null;
    price: import("@prisma/client-runtime-utils").Decimal;
    status: import("../../generated/prisma/enums").variant_status;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const findInventoryByVariantId: (variantId: number) => Promise<{
    inventory_id: number;
    variant_id: number;
    stock_quantity: number;
    reserved_quantity: number;
    updated_at: Date | null;
} | null>;
export declare const findVariantWithProduct: (variantId: number) => Promise<{
    product: {
        product_id: number;
        store_id: number;
    };
    product_id: number;
    variant_id: number;
} | null>;
export declare const updatedInventory: (variantId: number, stockQuantity: number) => Promise<{
    inventory_id: number;
    variant_id: number;
    stock_quantity: number;
    reserved_quantity: number;
    updated_at: Date | null;
}>;
export declare const createProductImage: (productId: number, data: CreateProductImages) => Promise<{
    productimage_id: number;
    product_id: number;
    image_url: string;
    is_primary: boolean;
    display_order: number;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const getProductImages: (productId: number) => Promise<{
    productimage_id: number;
    product_id: number;
    image_url: string;
    is_primary: boolean;
    display_order: number;
    created_at: Date | null;
    updated_at: Date | null;
}[]>;
export declare const findProductImage: (imageId: number) => Promise<{
    productimage_id: number;
    product_id: number;
    image_url: string;
    is_primary: boolean;
    display_order: number;
    created_at: Date | null;
    updated_at: Date | null;
} | null>;
export declare const updateProductImages: (ProductImageId: number, data: UpdateProductImages) => Promise<{
    productimage_id: number;
    product_id: number;
    image_url: string;
    is_primary: boolean;
    display_order: number;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const deleteProductImage: (productImageId: number) => Promise<{
    productimage_id: number;
    product_id: number;
    image_url: string;
    is_primary: boolean;
    display_order: number;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const getProducts: (query: ProductQuery) => Promise<{
    products: {
        product_id: number;
        product_name: string;
        description: string;
        slug: string;
        status: import("../../generated/prisma/enums").product_status;
        category_id: number | null;
        store_id: number;
        metadata: import("@prisma/client/runtime/client").JsonValue | null;
        created_at: Date | null;
        updated_at: Date | null;
    }[];
    total: number;
    pagination: {
        page: number;
        limit: number;
        totalPages: number;
    };
}>;
export declare const updateProduct: (productId: number, data: UpdateProduct) => Promise<{
    product_id: number;
    product_name: string;
    description: string;
    slug: string;
    status: import("../../generated/prisma/enums").product_status;
    category_id: number | null;
    store_id: number;
    metadata: import("@prisma/client/runtime/client").JsonValue | null;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const deleteProduct: (tx: Prisma.TransactionClient, productId: number) => Promise<{
    product_id: number;
    product_name: string;
    description: string;
    slug: string;
    status: import("../../generated/prisma/enums").product_status;
    category_id: number | null;
    store_id: number;
    metadata: import("@prisma/client/runtime/client").JsonValue | null;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const deleteWishlistByProductId: (tx: Prisma.TransactionClient, productId: number) => Promise<Prisma.BatchPayload>;
export declare const deleteReviewsByProductId: (tx: Prisma.TransactionClient, productId: number) => Promise<Prisma.BatchPayload>;
export declare const cartItemByProductId: (tx: Prisma.TransactionClient, productId: number) => Promise<Prisma.BatchPayload>;
export declare const countOrderItemByProductId: (productId: number) => Promise<number>;
export declare const updateProductStatus: (productId: number, status: UpdateProductStatus) => Promise<{
    product_id: number;
    product_name: string;
    description: string;
    slug: string;
    status: import("../../generated/prisma/enums").product_status;
    category_id: number | null;
    store_id: number;
    metadata: import("@prisma/client/runtime/client").JsonValue | null;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const findProductForStatusUpdate: (productId: number) => Promise<({
    images: {
        productimage_id: number;
        product_id: number;
        image_url: string;
        is_primary: boolean;
        display_order: number;
        created_at: Date | null;
        updated_at: Date | null;
    }[];
    variants: {
        inventory: {
            inventory_id: number;
            variant_id: number;
            stock_quantity: number;
            reserved_quantity: number;
            updated_at: Date | null;
        } | null;
    }[];
} & {
    product_id: number;
    product_name: string;
    description: string;
    slug: string;
    status: import("../../generated/prisma/enums").product_status;
    category_id: number | null;
    store_id: number;
    metadata: import("@prisma/client/runtime/client").JsonValue | null;
    created_at: Date | null;
    updated_at: Date | null;
}) | null>;
//# sourceMappingURL=products.repository.d.ts.map