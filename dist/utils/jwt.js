"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("./AppError");
const http_status_codes_1 = require("http-status-codes");
const generateAccessToken = (userId, role) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new AppError_1.AppError("JWT_ACCESS_SECRET not defined", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
    const accessToken = jsonwebtoken_1.default.sign({ userId, role }, JWT_SECRET, {
        expiresIn: "15m"
    });
    return accessToken;
};
exports.generateAccessToken = generateAccessToken;
//# sourceMappingURL=jwt.js.map