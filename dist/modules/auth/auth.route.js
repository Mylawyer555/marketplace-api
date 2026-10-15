"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_controller_1 = require("./auth.controller");
const validation_middleware_1 = require("../../middlewares/validation.middleware");
const auth_validation_1 = require("./auth.validation");
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const authRoutes = (0, express_1.Router)();
authRoutes.post("/register", (0, validation_middleware_1.validate)(auth_validation_1.registerSchema), auth_controller_1.register);
authRoutes.post("/login", (0, validation_middleware_1.validate)(auth_validation_1.loginSchema), auth_controller_1.login);
authRoutes.post("/refresh", (0, validation_middleware_1.validate)(auth_validation_1.refreshTokenShema), auth_controller_1.refreshToken);
authRoutes.post("/logout", (0, validation_middleware_1.validate)(auth_validation_1.logOutSchema), auth_middleware_1.authenticate, auth_controller_1.logOut);
authRoutes.post("/change-password", (0, validation_middleware_1.validate)(auth_validation_1.changePasswordSchema), auth_middleware_1.authenticate, auth_controller_1.changePasswordController);
authRoutes.post("/forgot-password", (0, validation_middleware_1.validate)(auth_validation_1.forgotPasswordSchema), auth_controller_1.forgotPasswordController);
authRoutes.post("/reset-password", (0, validation_middleware_1.validate)(auth_validation_1.resetPasswordSchema), auth_controller_1.resetPasswordController);
exports.default = authRoutes;
//# sourceMappingURL=auth.route.js.map