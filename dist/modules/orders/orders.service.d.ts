import { Order_Status } from "./orders.types";
import { order_status } from "../../generated/prisma/enums";
export declare const getMyOrdersService: (userId: number) => Promise<{
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
    status: order_status;
    total_amount: import("@prisma/client-runtime-utils").Decimal;
}[]>;
export declare const getOrderByIdService: (orderId: number, userId: number) => Promise<{
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
    status: order_status;
    total_amount: import("@prisma/client-runtime-utils").Decimal;
}>;
export declare const orderStatusTransitionService: (orderId: number, data: Order_Status, userId: number) => Promise<{
    order_id: number;
    order_number: string;
    buyer_id: number;
    status: order_status;
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
export declare const orderCancellationService: (orderId: number, userId: number) => Promise<{
    order_id: number;
    order_number: string;
    buyer_id: number;
    status: order_status;
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
//# sourceMappingURL=orders.service.d.ts.map