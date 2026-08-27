import { db } from "../../config/db";
import { CreateStore, UpdateStore } from "./stores.type";

export const findStoreBySellerId = async (sellerId: number) => {
    return db.store.findUnique({
        where: {
            seller_id: sellerId,
        },
    });
};

export const createStore = async (sellerId: number, storeData: CreateStore) => {
    return db.store.create({
        data: {
            seller_id: sellerId,
            store_name: storeData.storeName,
            description: storeData.description,
            logo: storeData.logo ?? null,
            social_media_account: storeData.socialMediaAccount ?? null
        },
    });
};

export const updateStoreData = async (sellerId: number, data: UpdateStore) => {

    const updateData: Record<string, string> = {};

    if(data.storeName !== undefined){
        updateData.store_name = data.storeName;
    }

    if (data.description !== undefined) {
        updateData.description = data.description;
    };

    if (data.logo !== undefined) {
        updateData.logo = data.logo;
    };

    if (data.socialMediaAccount !== undefined) {
        updateData.social_media_account = data.socialMediaAccount;
    };

    return db.store.update({
        where: {
            seller_id: sellerId,
        },
        data: updateData
    })
}