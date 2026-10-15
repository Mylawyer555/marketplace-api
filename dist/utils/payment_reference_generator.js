"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePaymentReference = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generatePaymentReference = () => {
    const randomChar = crypto_1.default.randomBytes(5).toString("hex");
    return `Pay-${Date.now()}-${randomChar}`;
};
exports.generatePaymentReference = generatePaymentReference;
//# sourceMappingURL=payment_reference_generator.js.map