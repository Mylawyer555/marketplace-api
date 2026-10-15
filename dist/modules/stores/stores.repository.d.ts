import { CreateStore, UpdateStore } from "./stores.type";
export declare const findStoreBySellerId: (sellerId: number) => Promise<{
    store_id: number;
    store_name: string;
    description: string;
    logo: string | null;
    social_media_account: string | null;
    status: import("../../generated/prisma/enums").store_status;
    seller_id: number;
    created_at: Date | null;
    updated_at: Date | null;
} | null>;
export declare const createStore: (sellerId: number, storeData: CreateStore) => Promise<{
    store_id: number;
    store_name: string;
    description: string;
    logo: string | null;
    social_media_account: string | null;
    status: import("../../generated/prisma/enums").store_status;
    seller_id: number;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const updateStoreData: (sellerId: number, data: UpdateStore) => Promise<{
    store_id: number;
    store_name: string;
    description: string;
    logo: string | null;
    social_media_account: string | null;
    status: import("../../generated/prisma/enums").store_status;
    seller_id: number;
    created_at: Date | null;
    updated_at: Date | null;
}>;
//# sourceMappingURL=stores.repository.d.ts.map