import { AddWishList } from "./wishlist.types";
export declare const findProductById: (productId: number) => Promise<{
    status: import("../../generated/prisma/enums").product_status;
} | null>;
export declare const findWishlist: (userId: number, productId: number) => Promise<{
    wishlist_id: number;
    user_id: number;
    product_id: number;
    created_at: Date | null;
    updated_at: Date | null;
} | null>;
export declare const createWishList: (userId: number, data: AddWishList) => Promise<{
    wishlist_id: number;
    user_id: number;
    product_id: number;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const findWishListByUserId: (userId: number) => Promise<{
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
} | null>;
export declare const findWishlistById: (wishlistId: number) => Promise<{
    wishlist_id: number;
    user_id: number;
    product_id: number;
    created_at: Date | null;
    updated_at: Date | null;
} | null>;
export declare const deleteWishlist: (wishlistId: number) => Promise<{
    wishlist_id: number;
    user_id: number;
    product_id: number;
    created_at: Date | null;
    updated_at: Date | null;
}>;
//# sourceMappingURL=wishlist.repository.d.ts.map