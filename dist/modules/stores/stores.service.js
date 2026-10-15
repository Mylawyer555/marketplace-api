"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreService = exports.getMyStore = exports.createStoreService = void 0;
const http_status_codes_1 = require("http-status-codes");
const AppError_1 = require("../../utils/AppError");
const auth_repository_1 = require("../auth/auth.repository");
const stores_repository_1 = require("./stores.repository");
const createStoreService = async (sellerId, data) => {
    const user = await (0, auth_repository_1.findUserById)(sellerId);
    if (!user) {
        throw new AppError_1.AppError("user not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (user.role !== "SELLER") {
        throw new AppError_1.AppError("User must be a seller", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const isUserStoreExist = await (0, stores_repository_1.findStoreBySellerId)(user.user_id);
    if (isUserStoreExist) {
        throw new AppError_1.AppError("Seller already has a store", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const newStore = await (0, stores_repository_1.createStore)(user.user_id, data);
    return newStore;
};
exports.createStoreService = createStoreService;
const getMyStore = async (sellerId) => {
    const user = await (0, auth_repository_1.findUserById)(sellerId);
    if (!user) {
        throw new AppError_1.AppError("User not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (user.role !== "SELLER") {
        throw new AppError_1.AppError("User must be a seller", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const store = await (0, stores_repository_1.findStoreBySellerId)(user.user_id);
    if (store === null) {
        throw new AppError_1.AppError("Store not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    return store;
};
exports.getMyStore = getMyStore;
const updateStoreService = async (sellerId, data) => {
    const user = await (0, auth_repository_1.findUserById)(sellerId);
    if (!user) {
        throw new AppError_1.AppError("User not found", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    if (user.role !== "SELLER") {
        throw new AppError_1.AppError("User must be a seller", http_status_codes_1.StatusCodes.FORBIDDEN);
    }
    const isUserStoreExist = await (0, stores_repository_1.findStoreBySellerId)(user.user_id);
    if (!isUserStoreExist) {
        throw new AppError_1.AppError("Store does not exist", http_status_codes_1.StatusCodes.NOT_FOUND);
    }
    const updatedStore = await (0, stores_repository_1.updateStoreData)(user.user_id, data);
    return updatedStore;
};
exports.updateStoreService = updateStoreService;
//# sourceMappingURL=stores.service.js.map