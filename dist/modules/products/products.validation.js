"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProductStatusSchema = exports.updateProductSchema = exports.getProductschema = exports.updateProductImageSchema = exports.createProductImageSchema = exports.createUpdateInventorySchema = exports.createProductVariantSchema = exports.createProductSchema = void 0;
const zod_1 = require("zod");
exports.createProductSchema = zod_1.z.object({
    productName: zod_1.z
        .string()
        .min(2, "product name must contain atleast 2 characters"),
    description: zod_1.z.string().min(10, "description must be atleast 10 characters"),
    categoryId: zod_1.z.number().int().positive("category ID must be a positive"),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
});
exports.createProductVariantSchema = zod_1.z.object({
    sku: zod_1.z.string().min(4, "SKU must be atleast 4 characters"),
    color: zod_1.z.string().nonempty("color cannot be empty"),
    varaintStorage: zod_1.z.string().optional(),
    price: zod_1.z.number().nonnegative(),
    stockQuantity: zod_1.z.number().int().nonnegative(),
});
exports.createUpdateInventorySchema = zod_1.z.object({
    stockQuantity: zod_1.z
        .number()
        .int()
        .nonnegative("Stock quantity must be a non-negative integer"),
});
exports.createProductImageSchema = zod_1.z.object({
    imageUrl: zod_1.z.url("Invalid image url"),
    isPrimary: zod_1.z.boolean().optional(),
    displayOrder: zod_1.z.number().int().positive().optional(),
});
exports.updateProductImageSchema = zod_1.z
    .object({
    imageUrl: zod_1.z.url("Invalid image url").optional(),
    isPrimary: zod_1.z.boolean().optional(),
    displayOrder: zod_1.z.number().int().positive().optional(),
})
    .refine((data) => data.imageUrl !== undefined ||
    data.isPrimary !== undefined ||
    data.displayOrder !== undefined, {
    message: "Atleast one field is required!",
});
exports.getProductschema = zod_1.z.object({
    search: zod_1.z.string().optional().describe("Search term must be a string"),
    categoryId: zod_1.z.coerce.number().int().nonnegative().optional(),
    minPrice: zod_1.z.coerce.number().optional(),
    maxPrice: zod_1.z.coerce.number().optional(),
    sortBy: zod_1.z.enum(["price", "createdAt", "name"]).optional(),
    sortOrder: zod_1.z.enum(["asc", "desc"]).optional(),
    page: zod_1.z.coerce.number().int().positive().optional(),
    limit: zod_1.z.coerce.number().int().positive().optional(),
});
exports.updateProductSchema = zod_1.z.object({
    productName: zod_1.z
        .string()
        .min(2, "product name must contain atleast 2 characters").optional(),
    description: zod_1.z.string().min(10, "description must be atleast 10 characters").optional(),
    categoryId: zod_1.z.number().int().positive("category ID must be a positive").optional(),
    metadata: zod_1.z.record(zod_1.z.string(), zod_1.z.unknown()).optional(),
}).refine((data) => data.productName !== undefined ||
    data.description !== undefined ||
    data.metadata !== undefined ||
    data.categoryId !== undefined, {
    message: "Atleast one field is required"
});
exports.updateProductStatusSchema = zod_1.z.object({
    status: zod_1.z.enum(["DRAFT", "ACTIVE", "DISABLED", "ARCHIVED"])
});
//# sourceMappingURL=products.validation.js.map