"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashResetToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const hashResetToken = (resetToken) => {
    const hash = crypto_1.default.createHash("sha256");
    // give hash a token
    hash.update(resetToken);
    //convert hash to string
    return hash.digest("hex");
};
exports.hashResetToken = hashResetToken;
//# sourceMappingURL=hashResetToken.js.map