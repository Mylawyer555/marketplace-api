"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordController = exports.forgotPasswordController = exports.changePasswordController = exports.logOut = exports.refreshToken = exports.login = exports.register = void 0;
const auth_service_1 = require("./auth.service");
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../utils/AppError");
const register = async (req, res, next) => {
    const user = await (0, auth_service_1.registerUser)(req.body);
    return res.status(201).json({
        message: "User successfully registered",
        user,
    });
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const result = await (0, auth_service_1.loginUser)(req.body);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.login = login;
const refreshToken = async (req, res, next) => {
    try {
        const { refreshToken } = req.body;
        const result = await (0, auth_service_1.refreshAccessToken)(refreshToken);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Access token refreshed",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.refreshToken = refreshToken;
const logOut = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Aunthentication required", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const userId = req.user.userId;
        const { refreshToken } = req.body;
        const result = await (0, auth_service_1.logOutUser)(userId, refreshToken);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Logout successfully",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.logOut = logOut;
const changePasswordController = async (req, res, next) => {
    try {
        if (!req.user) {
            throw new AppError_1.AppError("Authenticate user", http_status_codes_1.StatusCodes.UNAUTHORIZED);
        }
        const userId = req.user.userId;
        const { currentPassword, newPassword } = req.body;
        const result = await (0, auth_service_1.changePassword)(userId, currentPassword, newPassword);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "Change of password successful!",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.changePasswordController = changePasswordController;
const forgotPasswordController = async (req, res, next) => {
    try {
        const { email } = req.body;
        const result = await (0, auth_service_1.forgotPassword)(email);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "If the email exists, a password reset link has been sent.",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.forgotPasswordController = forgotPasswordController;
const resetPasswordController = async (req, res, next) => {
    try {
        const { resetToken } = req.body;
        const { newPassword } = req.body;
        const result = await (0, auth_service_1.resetPassword)(resetToken, newPassword);
        res.status(http_status_codes_1.StatusCodes.OK).json({
            success: true,
            message: "password reset successful",
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.resetPasswordController = resetPasswordController;
//# sourceMappingURL=auth.controller.js.map