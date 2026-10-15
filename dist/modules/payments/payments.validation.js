"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.paymentMethodSchema = void 0;
const zod_1 = require("zod");
exports.paymentMethodSchema = zod_1.z.object({
    method: zod_1.z.enum([
        "CARD",
        "BANK_TRANSFER",
        "WALLET",
        "CASH_ON_DELIVERY"
    ])
});
//# sourceMappingURL=payments.validation.js.map