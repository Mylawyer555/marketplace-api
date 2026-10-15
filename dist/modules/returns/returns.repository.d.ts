import { returns_status } from "../../generated/prisma/enums";
import { Returns } from "./returns.types";
export declare const findOrderItemByItemId: (itemId: number) => Promise<({
    orders: {
        buyer_id: number;
        status: import("../../generated/prisma/enums").order_status;
    };
} & {
    item_id: number;
    product_id: number;
    order_id: number;
    variant_id: number;
    quantity: number;
    price_at_purchase: import("@prisma/client-runtime-utils").Decimal;
    created_at: Date | null;
    updated_at: Date | null;
}) | null>;
export declare const createReturn: (itemId: number, data: Returns) => Promise<{
    return_id: number;
    order_item_id: number;
    reason: string;
    quantity: number;
    status: returns_status;
    requested_at: Date | null;
    approved_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const findReturnsByOrderItemId: (itemId: number) => Promise<{
    quantity: number;
    status: returns_status;
}[]>;
export declare const findReturnById: (returnId: number) => Promise<{
    status: returns_status;
} | null>;
export declare const updateReturnStatus: (returnId: number, nextStatus: returns_status) => Promise<{
    return_id: number;
    order_item_id: number;
    reason: string;
    quantity: number;
    status: returns_status;
    requested_at: Date | null;
    approved_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
}>;
//# sourceMappingURL=returns.repository.d.ts.map