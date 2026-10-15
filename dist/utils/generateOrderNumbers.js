"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOrderNumber = void 0;
const crypto_1 = __importDefault(require("crypto"));
const generateOrderNumber = () => {
    const timestamp = Date.now();
    const randomChar = crypto_1.default.randomBytes(6).toString("hex");
    return `ODX-${timestamp}-${randomChar}`;
};
exports.generateOrderNumber = generateOrderNumber;
//# sourceMappingURL=generateOrderNumbers.js.map