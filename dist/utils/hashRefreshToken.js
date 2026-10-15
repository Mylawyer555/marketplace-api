"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashRefreshToken = void 0;
const crypto_1 = __importDefault(require("crypto"));
const hashRefreshToken = (token) => {
    const hash = crypto_1.default.createHash("sha256");
    //give hash a token
    hash.update(token);
    //convert resulting hash to string
    return hash.digest("hex");
};
exports.hashRefreshToken = hashRefreshToken;
//# sourceMappingURL=hashRefreshToken.js.map