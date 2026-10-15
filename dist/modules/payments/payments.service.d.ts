import { PaymentMethod } from "./payments.types";
export declare const createPaymentService: (orderId: number, userId: number, data: PaymentMethod, key: string) => Promise<{
    payment_id: number;
    order_id: number;
    payment_reference: string;
    amount: import("@prisma/client-runtime-utils").Decimal;
    method: import("../../generated/prisma/enums").payment_method;
    status: import("../../generated/prisma/enums").payment_status;
    idempotency_key: string | null;
    paid_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const processPaymentService: (paymentId: number) => Promise<{
    payment: {
        payment_id: number;
        order_id: number;
        payment_reference: string;
        amount: import("@prisma/client-runtime-utils").Decimal;
        method: import("../../generated/prisma/enums").payment_method;
        status: import("../../generated/prisma/enums").payment_status;
        idempotency_key: string | null;
        paid_at: Date | null;
        created_at: Date | null;
        updated_at: Date | null;
    };
    order: {
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
    };
}>;
export declare const failPaymentService: (paymentId: number) => Promise<{
    payment_id: number;
    order_id: number;
    payment_reference: string;
    amount: import("@prisma/client-runtime-utils").Decimal;
    method: import("../../generated/prisma/enums").payment_method;
    status: import("../../generated/prisma/enums").payment_status;
    idempotency_key: string | null;
    paid_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const refundPaymentService: (paymentId: number) => Promise<{
    payment_id: number;
    order_id: number;
    payment_reference: string;
    amount: import("@prisma/client-runtime-utils").Decimal;
    method: import("../../generated/prisma/enums").payment_method;
    status: import("../../generated/prisma/enums").payment_status;
    idempotency_key: string | null;
    paid_at: Date | null;
    created_at: Date | null;
    updated_at: Date | null;
}>;
//# sourceMappingURL=payments.service.d.ts.map