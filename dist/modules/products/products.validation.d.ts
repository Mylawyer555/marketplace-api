import { z } from "zod";
export declare const createProductSchema: z.ZodObject<{
    productName: z.ZodString;
    description: z.ZodString;
    categoryId: z.ZodNumber;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
export declare const createProductVariantSchema: z.ZodObject<{
    sku: z.ZodString;
    color: z.ZodString;
    varaintStorage: z.ZodOptional<z.ZodString>;
    price: z.ZodNumber;
    stockQuantity: z.ZodNumber;
}, z.core.$strip>;
export declare const createUpdateInventorySchema: z.ZodObject<{
    stockQuantity: z.ZodNumber;
}, z.core.$strip>;
export declare const createProductImageSchema: z.ZodObject<{
    imageUrl: z.ZodURL;
    isPrimary: z.ZodOptional<z.ZodBoolean>;
    displayOrder: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const updateProductImageSchema: z.ZodObject<{
    imageUrl: z.ZodOptional<z.ZodURL>;
    isPrimary: z.ZodOptional<z.ZodBoolean>;
    displayOrder: z.ZodOptional<z.ZodNumber>;
}, z.core.$strip>;
export declare const getProductschema: z.ZodObject<{
    search: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    minPrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    maxPrice: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    sortBy: z.ZodOptional<z.ZodEnum<{
        createdAt: "createdAt";
        name: "name";
        price: "price";
    }>>;
    sortOrder: z.ZodOptional<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
    page: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodOptional<z.ZodCoercedNumber<unknown>>;
}, z.core.$strip>;
export declare const updateProductSchema: z.ZodObject<{
    productName: z.ZodOptional<z.ZodString>;
    description: z.ZodOptional<z.ZodString>;
    categoryId: z.ZodOptional<z.ZodNumber>;
    metadata: z.ZodOptional<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
export declare const updateProductStatusSchema: z.ZodObject<{
    status: z.ZodEnum<{
        ACTIVE: "ACTIVE";
        ARCHIVED: "ARCHIVED";
        DISABLED: "DISABLED";
        DRAFT: "DRAFT";
    }>;
}, z.core.$strip>;
//# sourceMappingURL=products.validation.d.ts.map