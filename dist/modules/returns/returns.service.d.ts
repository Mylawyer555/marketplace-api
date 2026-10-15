import { Returns } from "./returns.types";
import { returns_status } from "../../generated/prisma/enums";
export declare const returnsService: (userId: number, itemId: number, data: Returns) => Promise<{
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
export declare const returnStatusTransitionService: (returnId: number, nextStatus: returns_status) => Promise<{
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
//# sourceMappingURL=returns.service.d.ts.map