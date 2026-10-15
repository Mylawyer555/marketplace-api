import { AddWishList } from "./wishlist.types";
export declare const addWishlistService: (userId: number, data: AddWishList) => Promise<{
    wishlist_id: number;
    user_id: number;
    product_id: number;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const getWishLishService: (userId: number) => Promise<{
    wishlists: {
        product_id: number;
        products: {
            images: {
                image_url: string;
                productimage_id: number;
            }[];
            product_id: number;
            product_name: string;
            status: import("../../generated/prisma/enums").product_status;
        };
        wishlist_id: number;
    }[];
} | {
    data: never[];
}>;
export declare const deleteWishlistService: (wishlistId: number, userId: number) => Promise<{
    wishlist_id: number;
    user_id: number;
    product_id: number;
    created_at: Date | null;
    updated_at: Date | null;
}>;
//# sourceMappingURL=wishlist.service.d.ts.map