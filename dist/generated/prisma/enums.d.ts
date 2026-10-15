export declare const addresstype: {
    readonly HOME: 'HOME';
    readonly OFFICE: 'OFFICE';
};
export type addresstype = (typeof addresstype)[keyof typeof addresstype];
export declare const coupon_status: {
    readonly ACTIVE: 'ACTIVE';
    readonly INACTIVE: 'INACTIVE';
    readonly EXPIRED: 'EXPIRED';
};
export type coupon_status = (typeof coupon_status)[keyof typeof coupon_status];
export declare const account_status: {
    readonly ACTIVE: 'ACTIVE';
    readonly DEACTIVATED: 'DEACTIVATED';
    readonly SUSPENDED: 'SUSPENDED';
};
export type account_status = (typeof account_status)[keyof typeof account_status];
export declare const store_status: {
    readonly ACTIVE: 'ACTIVE';
    readonly SUSPENDED: 'SUSPENDED';
    readonly CLOSED: 'CLOSED';
};
export type store_status = (typeof store_status)[keyof typeof store_status];
export declare const discount_type: {
    readonly PERCENTAGE: 'PERCENTAGE';
    readonly FIXED_AMOUNT: 'FIXED_AMOUNT';
};
export type discount_type = (typeof discount_type)[keyof typeof discount_type];
export declare const notification_type: {
    readonly ORDER: 'ORDER';
    readonly PAYMENT: 'PAYMENT';
    readonly SHIPPING: 'SHIPPING';
    readonly COUPON: 'COUPON';
    readonly PROMOTION: 'PROMOTION';
    readonly REVIEW: 'REVIEW';
    readonly SYSTEM: 'SYSTEM';
};
export type notification_type = (typeof notification_type)[keyof typeof notification_type];
export declare const order_status: {
    readonly PENDING: 'PENDING';
    readonly PAID: 'PAID';
    readonly PROCESSING: 'PROCESSING';
    readonly SHIPPED: 'SHIPPED';
    readonly DELIVERED: 'DELIVERED';
    readonly CANCELLED: 'CANCELLED';
    readonly REFUNDED: 'REFUNDED';
};
export type order_status = (typeof order_status)[keyof typeof order_status];
export declare const payment_method: {
    readonly CARD: 'CARD';
    readonly BANK_TRANSFER: 'BANK_TRANSFER';
    readonly WALLET: 'WALLET';
    readonly CASH_ON_DELIVERY: 'CASH_ON_DELIVERY';
};
export type payment_method = (typeof payment_method)[keyof typeof payment_method];
export declare const payment_status: {
    readonly PENDING: 'PENDING';
    readonly SUCCESS: 'SUCCESS';
    readonly FAILED: 'FAILED';
    readonly REFUNDED: 'REFUNDED';
    readonly CANCELLED: 'CANCELLED';
};
export type payment_status = (typeof payment_status)[keyof typeof payment_status];
export declare const payout_status: {
    readonly PENDING: 'PENDING';
    readonly PROCESSING: 'PROCESSING';
    readonly PAID: 'PAID';
    readonly FAILED: 'FAILED';
    readonly CANCELLED: 'CANCELLED';
};
export type payout_status = (typeof payout_status)[keyof typeof payout_status];
export declare const product_status: {
    readonly DRAFT: 'DRAFT';
    readonly ACTIVE: 'ACTIVE';
    readonly ARCHIVED: 'ARCHIVED';
    readonly DISABLED: 'DISABLED';
};
export type product_status = (typeof product_status)[keyof typeof product_status];
export declare const reference_type: {
    readonly ORDER: 'ORDER';
    readonly PRODUCT: 'PRODUCT';
    readonly USER: 'USER';
    readonly SELLER: 'SELLER';
    readonly PAYMENT: 'PAYMENT';
    readonly REVIEW: 'REVIEW';
    readonly RETURN: 'RETURN';
    readonly COUPON: 'COUPON';
    readonly DISPUTE: 'DISPUTE';
    readonly PAYOUT: 'PAYOUT';
    readonly CATEGORY: 'CATEGORY';
    readonly SYSTEM: 'SYSTEM';
};
export type reference_type = (typeof reference_type)[keyof typeof reference_type];
export declare const refund_status: {
    readonly PENDING: 'PENDING';
    readonly PROCESSING: 'PROCESSING';
    readonly SUCCESS: 'SUCCESS';
    readonly FAILED: 'FAILED';
    readonly CANCELLED: 'CANCELLED';
};
export type refund_status = (typeof refund_status)[keyof typeof refund_status];
export declare const returns_status: {
    readonly REQUESTED: 'REQUESTED';
    readonly APPROVED: 'APPROVED';
    readonly REJECTED: 'REJECTED';
    readonly RECEIVED: 'RECEIVED';
    readonly COMPLETED: 'COMPLETED';
};
export type returns_status = (typeof returns_status)[keyof typeof returns_status];
export declare const shipping_status: {
    readonly PENDING: 'PENDING';
    readonly PACKED: 'PACKED';
    readonly SHIPPED: 'SHIPPED';
    readonly OUT_FOR_DELIVERY: 'OUT_FOR_DELIVERY';
    readonly DELIVERED: 'DELIVERED';
    readonly FAILED: 'FAILED';
    readonly RETURNED: 'RETURNED';
};
export type shipping_status = (typeof shipping_status)[keyof typeof shipping_status];
export declare const user_role: {
    readonly BUYER: 'BUYER';
    readonly SELLER: 'SELLER';
    readonly ADMIN: 'ADMIN';
};
export type user_role = (typeof user_role)[keyof typeof user_role];
export declare const variant_status: {
    readonly ACTIVE: 'ACTIVE';
    readonly OUT_OF_STOCK: 'OUT_OF_STOCK';
    readonly DISABLED: 'DISABLED';
    readonly ARCHIVED: 'ARCHIVED';
};
export type variant_status = (typeof variant_status)[keyof typeof variant_status];
//# sourceMappingURL=enums.d.ts.map