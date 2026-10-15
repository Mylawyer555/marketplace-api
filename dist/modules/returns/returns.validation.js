"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnStatusSchema = exports.returnSchema = void 0;
const zod_1 = require("zod");
exports.returnSchema = zod_1.z.object({
    quantity: zod_1.z.number().int().positive(),
    reason: zod_1.z.string().min(5, "Reason should be at least five characters"),
});
exports.returnStatusSchema = zod_1.z.object({
    status: zod_1.z.enum([
        "REQUESTED",
        "APPROVED",
        "REJECTED",
        "RECEIVED",
        "COMPLETED",
    ]),
});
//# sourceMappingURL=returns.validation.js.map