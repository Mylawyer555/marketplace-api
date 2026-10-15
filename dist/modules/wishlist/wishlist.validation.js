"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addWishListSchema = void 0;
const zod_1 = require("zod");
exports.addWishListSchema = zod_1.z.object({
    productId: zod_1.z.number().int().positive(),
});
//# sourceMappingURL=wishlist.validation.js.map