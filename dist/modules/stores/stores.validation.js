"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreSchema = exports.createStoreSchema = void 0;
const zod_1 = require("zod");
exports.createStoreSchema = zod_1.z.object({
    storeName: zod_1.z.string().min(2, "store name must be atleast two characters"),
    description: zod_1.z.string().min(10, "atleast 10 characters required"),
    logo: zod_1.z.url().optional(),
    socialMediaAccount: zod_1.z.url().optional()
});
exports.updateStoreSchema = zod_1.z.object({
    storeName: zod_1.z.string().min(2, "store name must be atleast two characters").optional(),
    description: zod_1.z.string().min(10, "atleast 10 characters required").optional(),
    logo: zod_1.z.url().optional(),
    socialMediaAccount: zod_1.z.url().optional()
}).refine((data) => data.storeName !== undefined || data.description !== undefined || data.logo !== undefined || data.socialMediaAccount !== undefined, {
    message: "Atleast one field is required!"
});
//# sourceMappingURL=stores.validation.js.map