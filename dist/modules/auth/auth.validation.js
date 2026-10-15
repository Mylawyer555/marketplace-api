"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetPasswordSchema = exports.forgotPasswordSchema = exports.changePasswordSchema = exports.logOutSchema = exports.refreshTokenShema = exports.loginSchema = exports.registerSchema = void 0;
const zod_1 = require("zod");
exports.registerSchema = zod_1.z.object({
    firstName: zod_1.z.string().min(2, "firstname must be atleast 2 charcaters"),
    lastName: zod_1.z.string().min(2, "lastname must be atleast 2 characters"),
    email: zod_1.z.email("Invalid email address"),
    phoneNumber: zod_1.z.string().optional(),
    password: zod_1.z.string().min(8, "password must be atleast 8 characters")
});
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.email("Invalid email!"),
    password: zod_1.z.string().min(8, "password must be atleast 8 characters")
});
exports.refreshTokenShema = zod_1.z.object({
    refreshToken: zod_1.z.string()
});
exports.logOutSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1, "Refresh token is required")
});
exports.changePasswordSchema = zod_1.z.object({
    currentPassword: zod_1.z.string().min(8, "Password must be atleast 8 characters"),
    newPassword: zod_1.z.string().min(8, "Password must be atleast 8 characters"),
    confirmPassword: zod_1.z.string().min(8, "Password must be atleast 8 characters")
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"]
});
exports.forgotPasswordSchema = zod_1.z.object({
    email: zod_1.z.email("Invalid email")
});
exports.resetPasswordSchema = zod_1.z.object({
    resetToken: zod_1.z.string().min(1, "reset token required"),
    newPassword: zod_1.z.string().min(8, "password must contain atleast 8 characters"),
    confirmPassword: zod_1.z.string().min(8, "password must contain atleast 8 characters")
}).refine((data) => data.newPassword === data.confirmPassword, {
    message: "Password does not match",
    path: ["confirmPassword"]
});
//# sourceMappingURL=auth.validation.js.map