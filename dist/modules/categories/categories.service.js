"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCategoryByIdService = exports.createCategoryService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../utils/AppError");
const categories_repository_1 = require("./categories.repository");
const auth_repository_1 = require("../auth/auth.repository");
const createCategoryService = async (sellerId, data) => {
    const user = await (0, auth_repository_1.findUserById)(sellerId);
    if (!user) {
        throw new AppError_1.AppError("user does not exist!", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    ;
    if (user.role !== "SELLER") {
        throw new AppError_1.AppError("user must be a seller", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    ;
    const isCategoryExist = await (0, categories_repository_1.findCategoryByName)(data.categoryName);
    if (isCategoryExist) {
        throw new AppError_1.AppError("category already exist!", http_status_codes_1.StatusCodes.CONFLICT);
    }
    ;
    return await (0, categories_repository_1.createCategory)(data);
};
exports.createCategoryService = createCategoryService;
const findCategoryByIdService = async (categoryId) => {
    const category = await (0, categories_repository_1.findCategoryById)(categoryId);
    if (!category) {
        throw new AppError_1.AppError("Category does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    ;
    return category;
};
exports.findCategoryByIdService = findCategoryByIdService;
//# sourceMappingURL=categories.service.js.map