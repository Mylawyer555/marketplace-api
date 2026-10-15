import { CreateProduct, CreateProductImages, CreateProductVariant, ProductQuery, updateInventory, UpdateProduct, UpdateProductImages, UpdateProductStatus } from "./products.type";
import { product_status } from "../../generated/prisma/enums";
export declare const createProductService: (sellerId: number, data: CreateProduct) => Promise<{
    product_id: number;
    product_name: string;
    description: string;
    slug: string;
    status: product_status;
    category_id: number | null;
    store_id: number;
    metadata: import("@prisma/client/runtime/client").JsonValue | null;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const createProductVariantService: (sellerId: number, productId: number, data: CreateProductVariant) => Promise<{
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
export declare const getInventoryService: (sellerId: number, variantId: number) => Promise<{
    inventory_id: number;
    variant_id: number;
    stock_quantity: number;
    reserved_quantity: number;
    updated_at: Date | null;
    availableQuantity: number;
}>;
export declare const updateInventoryService: (sellerId: number, variantId: number, data: updateInventory) => Promise<{
    inventory_id: number;
    variant_id: number;
    stock_quantity: number;
    reserved_quantity: number;
    updated_at: Date | null;
}>;
export declare const createProductImageService: (sellerId: number, productId: number, data: CreateProductImages) => Promise<{
    productimage_id: number;
    product_id: number;
    image_url: string;
    is_primary: boolean;
    display_order: number;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const getProductImageService: (productId: number) => Promise<{
    productimage_id: number;
    product_id: number;
    image_url: string;
    is_primary: boolean;
    display_order: number;
    created_at: Date | null;
    updated_at: Date | null;
}[]>;
export declare const updateProductImageService: (SellerId: number, productId: number, ProductImageId: number, data: UpdateProductImages) => Promise<{
    productimage_id: number;
    product_id: number;
    image_url: string;
    is_primary: boolean;
    display_order: number;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const deleteProductImageService: (sellerId: number, productId: number, productImageId: number) => Promise<{
    productimage_id: number;
    product_id: number;
    image_url: string;
    is_primary: boolean;
    display_order: number;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const getProductListing: (queryParams: ProductQuery) => Promise<{
    products: {
        product_id: number;
        product_name: string;
        description: string;
        slug: string;
        status: product_status;
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
export declare const updateProductService: (sellerId: number, productId: number, data: UpdateProduct) => Promise<{
    product_id: number;
    product_name: string;
    description: string;
    slug: string;
    status: product_status;
    category_id: number | null;
    store_id: number;
    metadata: import("@prisma/client/runtime/client").JsonValue | null;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const deleteProductService: (sellerId: number, productId: number) => Promise<void>;
export declare const updateProductStatusService: (sellerId: number, productId: number, status: UpdateProductStatus) => Promise<{
    product_id: number;
    product_name: string;
    description: string;
    slug: string;
    status: product_status;
    category_id: number | null;
    store_id: number;
    metadata: import("@prisma/client/runtime/client").JsonValue | null;
    created_at: Date | null;
    updated_at: Date | null;
}>;
//# sourceMappingURL=products.service.d.ts.map