"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateCartQuantitySchema = exports.createCartSchema = void 0;
const zod_1 = require("zod");
exports.createCartSchema = zod_1.z.object({
    variantId: zod_1.z.number().int().positive("variantId must be a positive integer"),
    quantity: zod_1.z.number().int().positive("quantity must be a positive integer")
});
exports.updateCartQuantitySchema = zod_1.z.object({
    quantity: zod_1.z.number().int().positive(),
});
//# sourceMappingURL=cart.valiadtion.js.map