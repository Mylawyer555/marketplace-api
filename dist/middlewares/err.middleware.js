"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const AppError_1 = require("../utils/AppError");
const zod_1 = require("zod");
const errorHandler = (err, req, res, next) => {
    if (err instanceof AppError_1.AppError) {
        return res.status(err.statusCode).json({
            success: false,
            error: err.message,
        });
    }
    if (err instanceof zod_1.ZodError) {
        return res.status(400).json({
            success: false,
            error: err.issues,
        });
    }
    console.error("UNHANDLED ERROR:", err);
    return res.status(500).json({
        success: false,
        error: "Internal server error",
    });
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=err.middleware.js.map