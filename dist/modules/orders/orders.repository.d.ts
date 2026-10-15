import { Prisma } from "../../generated/prisma/client";
import { Order_Status } from "./orders.types";
export declare const findOrdersByUserId: (userId: number) => Promise<{
    created_at: Date | null;
    order_id: number;
    order_items: {
        item_id: number;
        price_at_purchase: import("@prisma/client-runtime-utils").Decimal;
        product_id: number;
        quantity: number;
        variant_id: number;
    }[];
    order_number: string;
    status: import("../../generated/prisma/enums").order_status;
    total_amount: import("@prisma/client-runtime-utils").Decimal;
}[]>;
export declare const findOrderByOrderId: (orderId: number) => Promise<{
    buyer_id: number;
    created_at: Date | null;
    order_id: number;
    order_items: {
        item_id: number;
        price_at_purchase: import("@prisma/client-runtime-utils").Decimal;
        product_id: number;
        quantity: number;
        variant: {
            color: string;
            sku: string;
            variant_storage: string | null;
        };
        variant_id: number;
    }[];
    order_number: string;
    status: import("../../generated/prisma/enums").order_status;
    total_amount: import("@prisma/client-runtime-utils").Decimal;
} | null>;
export declare const updateOrderStatus: (orderId: number, data: Order_Status) => Promise<{
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
export declare const findOrderForCancellation: (orderId: number, tx: Prisma.TransactionClient) => Promise<{
    buyer_id: number;
    order_id: number;
    order_items: {
        quantity: number;
        variant_id: number;
    }[];
    order_number: string;
    status: import("../../generated/prisma/enums").order_status;
} | null>;
export declare const releaseReservedQuantity: (variantId: number, quantity: number, tx: Prisma.TransactionClient) => Promise<Prisma.BatchPayload>;
export declare const updatecancellationStatus: (orderId: number, tx: Prisma.TransactionClient) => Promise<{
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
//# sourceMappingURL=orders.repository.d.ts.map