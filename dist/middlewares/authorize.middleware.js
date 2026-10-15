"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = void 0;
const AppError_1 = require("../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const authorize = (...allowedRole) => {
    return (req, res, next) => {
        const user = req.user;
        if (!user) {
            throw new AppError_1.AppError("Authentication required", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        ;
        if (!allowedRole.includes(user.role)) {
            throw new AppError_1.AppError("Access denied", http_status_codes_1.StatusCodes.FORBIDDEN);
        }
        ;
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=authorize.middleware.js.map