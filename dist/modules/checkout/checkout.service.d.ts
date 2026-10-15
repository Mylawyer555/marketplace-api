import { Checkout } from "./checkout.type";
import { Decimal } from "@prisma/client/runtime/client";
export declare const checkoutService: (userId: number, data: Checkout) => Promise<{
    order_id: number;
    order_number: string;
    buyer_id: number;
    status: import("../../generated/prisma/enums").order_status;
    total_amount: Decimal;
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
//# sourceMappingURL=checkout.service.d.ts.map