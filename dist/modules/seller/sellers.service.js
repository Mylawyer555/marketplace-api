"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.becomeSeller = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../utils/AppError");
const auth_repository_1 = require("../auth/auth.repository");
const sellers_repository_1 = require("./sellers.repository");
const becomeSeller = async (userId) => {
    const user = await (0, auth_repository_1.findUserById)(userId);
    if (!user) {
        throw new AppError_1.AppError("user does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (user.account_status !== "ACTIVE") {
        throw new AppError_1.AppError("Account is not active", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    if (user.role === "SELLER") {
        throw new AppError_1.AppError("Already a seller", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    if (user.role === "ADMIN") {
        throw new AppError_1.AppError("Admin cannot become a seller", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    return (0, sellers_repository_1.makeUserSeller)(user.user_id);
};
exports.becomeSeller = becomeSeller;
//# sourceMappingURL=sellers.service.js.map