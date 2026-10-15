import { AddToCart, UpdateCartQuantity } from "./cart.types";
import { Prisma } from "../../generated/prisma/client";
export declare const addToCart: (data: AddToCart, userId: number) => Promise<{
    cart_item_id: number;
    cart_id: number;
    variant_id: number;
    quantity: number;
    price: import("@prisma/client-runtime-utils").Decimal;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const getCartService: (userId: number) => Promise<{
    cart_items: {
        cart_id: number;
        cart_item_id: number;
        price: import("@prisma/client-runtime-utils").Decimal;
        quantity: number;
        variant: {
            color: string;
            product: {
                product_id: number;
                product_name: string;
                status: import("../../generated/prisma/enums").product_status;
            };
            sku: string;
            variant_id: number;
            variant_storage: string | null;
        };
    }[];
}>;
export declare const updateCartQuantityService: (cartItemId: number, data: UpdateCartQuantity, userId: number) => Promise<{
    cart_item_id: number;
    cart_id: number;
    variant_id: number;
    quantity: number;
    price: import("@prisma/client-runtime-utils").Decimal;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const removeCartItemService: (cartItemId: number, userId: number) => Promise<{
    cart_item_id: number;
    cart_id: number;
    variant_id: number;
    quantity: number;
    price: import("@prisma/client-runtime-utils").Decimal;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const clearCartService: (userId: number) => Promise<Prisma.BatchPayload>;
//# sourceMappingURL=cart.service.d.ts.map