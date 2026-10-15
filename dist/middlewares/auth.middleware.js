"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const AppError_1 = require("../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const authenticate = (req, res, next) => {
    const result = req.headers.authorization;
    if (!result) {
        throw new AppError_1.AppError("authorization header missing", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    const parts = result.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
        throw new AppError_1.AppError("Invalid authoriation header", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    ;
    const token = parts[1];
    if (typeof token !== "string") {
        throw new AppError_1.AppError("Invalid token", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    ;
    const JWT_SECRET = process.env.JWT_SECRET;
    if (!JWT_SECRET) {
        throw new AppError_1.AppError("JWT secret not defined", http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR);
    }
    ;
    const decode = jsonwebtoken_1.default.verify(token, JWT_SECRET);
    console.log(decode);
    req.user = {
        userId: decode.userId,
        role: decode.role
    };
    next();
};
exports.authenticate = authenticate;
//# sourceMappingURL=auth.middleware.js.map