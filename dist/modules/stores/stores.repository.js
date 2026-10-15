"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateStoreData = exports.createStore = exports.findStoreBySellerId = void 0;
const db_1 = require("../../config/db");
const findStoreBySellerId = async (sellerId) => {
    return db_1.db.store.findUnique({
        where: {
            seller_id: sellerId,
        },
    });
};
exports.findStoreBySellerId = findStoreBySellerId;
const createStore = async (sellerId, storeData) => {
    return db_1.db.store.create({
        data: {
            seller_id: sellerId,
            store_name: storeData.storeName,
            description: storeData.description,
            logo: storeData.logo ?? null,
            social_media_account: storeData.socialMediaAccount ?? null
        },
    });
};
exports.createStore = createStore;
const updateStoreData = async (sellerId, data) => {
    const updateData = {};
    if (data.storeName !== undefined) {
        updateData.store_name = data.storeName;
    }
    if (data.description !== undefined) {
        updateData.description = data.description;
    }
    ;
    if (data.logo !== undefined) {
        updateData.logo = data.logo;
    }
    ;
    if (data.socialMediaAccount !== undefined) {
        updateData.social_media_account = data.socialMediaAccount;
    }
    ;
    return db_1.db.store.update({
        where: {
            seller_id: sellerId,
        },
        data: updateData
    });
};
exports.updateStoreData = updateStoreData;
//# sourceMappingURL=stores.repository.js.map