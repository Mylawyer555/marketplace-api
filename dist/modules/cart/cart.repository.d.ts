import { Prisma } from "../../generated/prisma/client";
import { AddToCart, UpdateCartQuantity } from "./cart.types";
export declare const findVariantForCart: (variantId: number) => Promise<{
    inventory: {
        reserved_quantity: number;
        stock_quantity: number;
    } | null;
    price: import("@prisma/client-runtime-utils").Decimal;
    product: {
        product_id: number;
        status: import("../../generated/prisma/enums").product_status;
    };
} | null>;
export declare const findCartByUserId: (userId: number) => Promise<{
    cart_id: number;
    user_id: number;
    created_at: Date | null;
    updated_at: Date | null;
} | null>;
export declare const findCartItem: (cartId: number, variantId: number) => Promise<{
    cart_item_id: number;
    cart_id: number;
    variant_id: number;
    quantity: number;
    price: import("@prisma/client-runtime-utils").Decimal;
    created_at: Date | null;
    updated_at: Date | null;
} | null>;
export declare const createCart: (userId: number) => Promise<{
    cart_id: number;
    user_id: number;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const createCartItem: (data: AddToCart, cartId: number, price: Prisma.Decimal) => Promise<{
    cart_item_id: number;
    cart_id: number;
    variant_id: number;
    quantity: number;
    price: import("@prisma/client-runtime-utils").Decimal;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const updateCartItem: (cartItemId: number, quantity: number) => Promise<{
    cart_item_id: number;
    cart_id: number;
    variant_id: number;
    quantity: number;
    price: import("@prisma/client-runtime-utils").Decimal;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const findCartByUserWithItems: (userId: number) => Promise<{
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
} | null>;
export declare const findCartItemById: (cartItemId: number) => Promise<{
    cart_id: number;
    cart_item_id: number;
    carts: {
        user_id: number;
    };
    variant: {
        inventory: {
            reserved_quantity: number;
            stock_quantity: number;
        } | null;
    };
    variant_id: number;
} | null>;
export declare const updateCartQuantity: (cartItemId: number, data: UpdateCartQuantity) => Promise<{
    cart_item_id: number;
    cart_id: number;
    variant_id: number;
    quantity: number;
    price: import("@prisma/client-runtime-utils").Decimal;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const deleteCartItem: (cartItem: number) => Promise<{
    cart_item_id: number;
    cart_id: number;
    variant_id: number;
    quantity: number;
    price: import("@prisma/client-runtime-utils").Decimal;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const clearCart: (cartId: number) => Promise<Prisma.BatchPayload>;
//# sourceMappingURL=cart.repository.d.ts.map