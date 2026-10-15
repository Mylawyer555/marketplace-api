import { Prisma } from "../../generated/prisma/client";
import { Decimal } from "../../generated/prisma/internal/prismaNamespace";
import { Checkout, InventoryLock } from "./checkout.type";
export declare const getCartByUserId: (userId: number, tx: Prisma.TransactionClient) => Promise<{
    cart_id: number;
    cart_items: {
        cart_item_id: number;
        price: import("@prisma/client-runtime-utils").Decimal;
        quantity: number;
        variant: {
            inventory: {
                reserved_quantity: number;
                stock_quantity: number;
            } | null;
            price: import("@prisma/client-runtime-utils").Decimal;
            product: {
                status: import("../../generated/prisma/enums").product_status;
            };
            product_id: number;
            status: import("../../generated/prisma/enums").variant_status;
        };
        variant_id: number;
    }[];
} | null>;
export declare const lockInventory: (variantId: number, tx: Prisma.TransactionClient) => Promise<InventoryLock[]>;
export declare const updateInventory: (variantId: number, quantity: number, tx: Prisma.TransactionClient) => Promise<{
    inventory_id: number;
    variant_id: number;
    stock_quantity: number;
    reserved_quantity: number;
    updated_at: Date | null;
}>;
export declare const createOrder: (buyerId: number, orderNumber: string, totalAmount: Decimal, data: Checkout, tx: Prisma.TransactionClient) => Promise<{
    order_id: number;
    order_number: string;
    buyer_id: number;
    status: import("../../generated/prisma/enums").order_status;
    total_amount: import("@prisma/client-runtime-utils").Decimal;
    shipping_name: string;
    shipping_phone_number: string;
    shipping_house_number: string | null;
    shipping_apartment_number: string | null;
    shipping_street: string;
    shipping_city: string;
    shipping_state: string;
    shipping_country: string;
    shipping_postal_code: string;
    delivery_note: string | null;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const createOrderItem: (orderId: number, productId: number, variantId: number, quantity: number, priceAtPurchase: Decimal, tx: Prisma.TransactionClient) => Promise<{
    item_id: number;
    product_id: number;
    order_id: number;
    variant_id: number;
    quantity: number;
    price_at_purchase: import("@prisma/client-runtime-utils").Decimal;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const clearCart: (cartId: number, tx: Prisma.TransactionClient) => Promise<Prisma.BatchPayload>;
//# sourceMappingURL=checkout.repository.d.ts.map