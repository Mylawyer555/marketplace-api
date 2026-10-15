"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPassword = exports.forgotPassword = exports.changePassword = exports.logOutUser = exports.refreshAccessToken = exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const auth_repository_1 = require("./auth.repository");
const AppError_1 = require("../../utils/AppError");
const http_status_codes_1 = require("http-status-codes");
const jwt_1 = require("../../utils/jwt");
const refreshToken_1 = require("../../utils/refreshToken");
const hashRefreshToken_1 = require("../../utils/hashRefreshToken");
const refreshExpiry_1 = require("../../utils/refreshExpiry");
const salt_rounds_1 = require("../../config/salt_rounds");
const resetToken_1 = require("../../utils/resetToken");
const hashResetToken_1 = require("../../utils/hashResetToken");
const registerUser = async (data) => {
    const isUserExist = await (0, auth_repository_1.findUserByEmail)(data.email);
    if (isUserExist) {
        throw new AppError_1.AppError("Email already exist", http_status_codes_1.StatusCodes.CONFLICT);
    }
    const hashPassword = await bcrypt_1.default.hash(data.password, salt_rounds_1.BCRYPT_SALT_ROUNDS);
    const user = await (0, auth_repository_1.createUser)({
        ...data,
        password: hashPassword,
    });
    return user;
};
exports.registerUser = registerUser;
const loginUser = async (data) => {
    const user = await (0, auth_repository_1.findUserByEmail)(data.email);
    if (!user) {
        throw new AppError_1.AppError("Invalid email or password", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    const isCheckPass = await bcrypt_1.default.compare(data.password, user.hash_password);
    if (!isCheckPass) {
        throw new AppError_1.AppError("Invalid email or password", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    //account status
    if (user.account_status === "DEACTIVATED") {
        const now = new Date();
        if (!user.deletion_at || user.deletion_at <= now) {
            throw new AppError_1.AppError("Account recovery period has expired", http_status_codes_1.StatusCodes.FORBIDDEN);
        }
        await (0, auth_repository_1.reactivateAccount)(user.user_id);
    }
    const accessToken = (0, jwt_1.generateAccessToken)(user.user_id, user.role);
    const plainRefreshToken = (0, refreshToken_1.generateRefreshToken)();
    const tokenHash = (0, hashRefreshToken_1.hashRefreshToken)(plainRefreshToken);
    const expiresAt = (0, refreshExpiry_1.generateRefreshExpiry)();
    await (0, auth_repository_1.createRefreshToken)(user.user_id, tokenHash, expiresAt);
    return { accessToken, refreshToken: plainRefreshToken };
};
exports.loginUser = loginUser;
const refreshAccessToken = async (refreshToken) => {
    const tokenHash = (0, hashRefreshToken_1.hashRefreshToken)(refreshToken);
    const token = await (0, auth_repository_1.findRefreshTokenByHash)(tokenHash);
    //isToken exist?
    if (!token) {
        throw new AppError_1.AppError("Invalid refresh token", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    //check refresh revoked
    if (token.revoked_at !== null) {
        throw new AppError_1.AppError("Refresh token revoked", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    //check refresh expiry
    const now = new Date();
    if (token.expires_at < now) {
        throw new AppError_1.AppError("Refresh token expired", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    //get user
    const user = token.users;
    //generate accessToken
    const accessToken = (0, jwt_1.generateAccessToken)(user.user_id, user.role);
    //generate new plain refresh token
    const plainRefreshToken = (0, refreshToken_1.generateRefreshToken)();
    //hash refresh token
    const newTokenHash = (0, hashRefreshToken_1.hashRefreshToken)(plainRefreshToken);
    // revoke current refresh token
    await (0, auth_repository_1.revokeRefreshToken)(token.refresh_token_id);
    //generate expiry
    const refreshExpiresAt = (0, refreshExpiry_1.generateRefreshExpiry)();
    //save to db
    await (0, auth_repository_1.createRefreshToken)(user.user_id, newTokenHash, refreshExpiresAt);
    return { accessToken, refreshToken: plainRefreshToken };
};
exports.refreshAccessToken = refreshAccessToken;
const logOutUser = async (userId, refreshToken) => {
    //hash refresh token
    const hashedToken = (0, hashRefreshToken_1.hashRefreshToken)(refreshToken);
    //find refresh token
    const token = await (0, auth_repository_1.findRefreshTokenByHash)(hashedToken);
    //check is token exist
    if (!token) {
        throw new AppError_1.AppError("Invalid refresh token", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    //verify token belongs to userId
    if (userId !== token.user_id) {
        throw new AppError_1.AppError("Invalid user", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    // verify revoke status
    if (token.revoked_at === null) {
        await (0, auth_repository_1.revokeRefreshToken)(token.refresh_token_id);
    }
    return {
        success: true,
    };
};
exports.logOutUser = logOutUser;
const changePassword = async (userId, currentPassword, newPassword) => {
    //authenticate user
    const user = await (0, auth_repository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.AppError("Invalid user", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    //compare password
    const comparedPassword = await bcrypt_1.default.compare(currentPassword, user.hash_password);
    if (!comparedPassword) {
        throw new AppError_1.AppError("Current password is incorrect", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    //hash new password
    const hashedPassword = await bcrypt_1.default.hash(newPassword, salt_rounds_1.BCRYPT_SALT_ROUNDS);
    //update db with new hashed password
    await (0, auth_repository_1.updateUserPassword)(user.user_id, hashedPassword);
    //revoke all refresh token
    await (0, auth_repository_1.revokeAllUserRefreshToken)(user.user_id);
    return {
        success: true,
    };
};
exports.changePassword = changePassword;
const forgotPassword = async (email) => {
    //authenticate user
    const user = await (0, auth_repository_1.findUserByEmail)(email);
    if (!user) {
        return {
            success: true,
            message: "If the email exists, a password reset link has been sent.",
        };
    }
    const plainResetToken = (0, resetToken_1.generateResetToken)();
    //hash token
    const hashedResetToken = (0, hashResetToken_1.hashResetToken)(plainResetToken);
    //expiry date
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + 5);
    //store hashtoken + expiry
    await (0, auth_repository_1.createResetToken)(user.user_id, hashedResetToken, expiresAt);
    return {
        success: true,
        resetToken: plainResetToken,
        message: "If the email exists, a password reset link has been sent.",
    };
};
exports.forgotPassword = forgotPassword;
const resetPassword = async (resetToken, newPassword) => {
    //hash reset token
    const tokenHash = (0, hashResetToken_1.hashResetToken)(resetToken);
    //find token in db
    const token = await (0, auth_repository_1.findResetTokenByHash)(tokenHash);
    if (!token) {
        throw new AppError_1.AppError("Invalid token", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    ;
    // check if token has been used or expired
    if (token.used_at !== null) {
        throw new AppError_1.AppError("token already used", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    ;
    const now = new Date();
    if (token.expires_at < now) {
        throw new AppError_1.AppError("token expired!", http_status_codes_1.StatusCodes.UNAUTHORIZED);
    }
    ;
    //get user
    const user = token.users;
    //hash new password
    const hashedPassword = await bcrypt_1.default.hash(newPassword, salt_rounds_1.BCRYPT_SALT_ROUNDS);
    //update password
    await (0, auth_repository_1.updateUserPassword)(user.user_id, hashedPassword);
    //update reset used at
    await (0, auth_repository_1.invalidateResetToken)(token.reset_token_id);
    //revoke all refresh tokem
    await (0, auth_repository_1.revokeAllUserRefreshToken)(user.user_id);
    return {
        success: true,
        message: "Password reset successful",
    };
};
exports.resetPassword = resetPassword;
//# sourceMappingURL=auth.service.js.map