import { db } from "../../config/db";
import { CreateStore } from "./stores.type";

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