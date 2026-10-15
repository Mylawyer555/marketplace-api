"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createCategorySchema = void 0;
const zod_1 = require("zod");
exports.createCategorySchema = zod_1.z.object({
    categoryName: zod_1.z.string().min(1, "cannot be empty minimum of one character").max(255, "Maximum of 255 characters for category name").nonempty().trim()
});
//# sourceMappingURL=categories.validation.js.map