import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly Address: 'Address';
    readonly Auditlog: 'Auditlog';
    readonly CartItem: 'CartItem';
    readonly Cart: 'Cart';
    readonly Category: 'Category';
    readonly Coupon: 'Coupon';
    readonly Inventory: 'Inventory';
    readonly Notification: 'Notification';
    readonly OrderItem: 'OrderItem';
    readonly Order: 'Order';
    readonly Payment: 'Payment';
    readonly ProductVariant: 'ProductVariant';
    readonly ProductImage: 'ProductImage';
    readonly Product: 'Product';
    readonly Refund: 'Refund';
    readonly Return: 'Return';
    readonly Review: 'Review';
    readonly SellersPayout: 'SellersPayout';
    readonly ShippingInfo: 'ShippingInfo';
    readonly Store: 'Store';
    readonly User: 'User';
    readonly Wishlist: 'Wishlist';
    readonly RefreshToken: 'RefreshToken';
    readonly ResetToken: 'ResetToken';
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: 'ReadUncommitted';
    readonly ReadCommitted: 'ReadCommitted';
    readonly RepeatableRead: 'RepeatableRead';
    readonly Serializable: 'Serializable';
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const AddressScalarFieldEnum: {
    readonly address_id: 'address_id';
    readonly address_type: 'address_type';
    readonly user_id: 'user_id';
    readonly house_number: 'house_number';
    readonly apartment_number: 'apartment_number';
    readonly street: 'street';
    readonly state: 'state';
    readonly city: 'city';
    readonly country: 'country';
    readonly delivery_note: 'delivery_note';
    readonly is_default: 'is_default';
    readonly phone_number: 'phone_number';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type AddressScalarFieldEnum = (typeof AddressScalarFieldEnum)[keyof typeof AddressScalarFieldEnum];
export declare const AuditlogScalarFieldEnum: {
    readonly audit_log_id: 'audit_log_id';
    readonly user_id: 'user_id';
    readonly action: 'action';
    readonly table_name: 'table_name';
    readonly record_id: 'record_id';
    readonly ip_address: 'ip_address';
    readonly created_at: 'created_at';
};
export type AuditlogScalarFieldEnum = (typeof AuditlogScalarFieldEnum)[keyof typeof AuditlogScalarFieldEnum];
export declare const CartItemScalarFieldEnum: {
    readonly cart_item_id: 'cart_item_id';
    readonly cart_id: 'cart_id';
    readonly variant_id: 'variant_id';
    readonly quantity: 'quantity';
    readonly price: 'price';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type CartItemScalarFieldEnum = (typeof CartItemScalarFieldEnum)[keyof typeof CartItemScalarFieldEnum];
export declare const CartScalarFieldEnum: {
    readonly cart_id: 'cart_id';
    readonly user_id: 'user_id';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type CartScalarFieldEnum = (typeof CartScalarFieldEnum)[keyof typeof CartScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly category_id: 'category_id';
    readonly category_name: 'category_name';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const CouponScalarFieldEnum: {
    readonly coupon_id: 'coupon_id';
    readonly coupon_code: 'coupon_code';
    readonly discount_type: 'discount_type';
    readonly discount_value: 'discount_value';
    readonly minimum_order_amount: 'minimum_order_amount';
    readonly usage_limit: 'usage_limit';
    readonly start_date: 'start_date';
    readonly end_date: 'end_date';
    readonly status: 'status';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type CouponScalarFieldEnum = (typeof CouponScalarFieldEnum)[keyof typeof CouponScalarFieldEnum];
export declare const InventoryScalarFieldEnum: {
    readonly inventory_id: 'inventory_id';
    readonly variant_id: 'variant_id';
    readonly stock_quantity: 'stock_quantity';
    readonly reserved_quantity: 'reserved_quantity';
    readonly updated_at: 'updated_at';
};
export type InventoryScalarFieldEnum = (typeof InventoryScalarFieldEnum)[keyof typeof InventoryScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly notification_id: 'notification_id';
    readonly user_id: 'user_id';
    readonly title: 'title';
    readonly message: 'message';
    readonly notification_type: 'notification_type';
    readonly reference_type: 'reference_type';
    readonly reference_id: 'reference_id';
    readonly isread: 'isread';
    readonly read_at: 'read_at';
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const OrderItemScalarFieldEnum: {
    readonly item_id: 'item_id';
    readonly product_id: 'product_id';
    readonly order_id: 'order_id';
    readonly variant_id: 'variant_id';
    readonly quantity: 'quantity';
    readonly price_at_purchase: 'price_at_purchase';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type OrderItemScalarFieldEnum = (typeof OrderItemScalarFieldEnum)[keyof typeof OrderItemScalarFieldEnum];
export declare const OrderScalarFieldEnum: {
    readonly order_id: 'order_id';
    readonly order_number: 'order_number';
    readonly buyer_id: 'buyer_id';
    readonly status: 'status';
    readonly total_amount: 'total_amount';
    readonly shipping_name: 'shipping_name';
    readonly shipping_phone_number: 'shipping_phone_number';
    readonly shipping_house_number: 'shipping_house_number';
    readonly shipping_apartment_number: 'shipping_apartment_number';
    readonly shipping_street: 'shipping_street';
    readonly shipping_city: 'shipping_city';
    readonly shipping_state: 'shipping_state';
    readonly shipping_country: 'shipping_country';
    readonly shipping_postal_code: 'shipping_postal_code';
    readonly delivery_note: 'delivery_note';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly payment_id: 'payment_id';
    readonly order_id: 'order_id';
    readonly payment_reference: 'payment_reference';
    readonly amount: 'amount';
    readonly method: 'method';
    readonly status: 'status';
    readonly idempotency_key: 'idempotency_key';
    readonly paid_at: 'paid_at';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const ProductVariantScalarFieldEnum: {
    readonly variant_id: 'variant_id';
    readonly product_id: 'product_id';
    readonly sku: 'sku';
    readonly color: 'color';
    readonly variant_storage: 'variant_storage';
    readonly price: 'price';
    readonly status: 'status';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type ProductVariantScalarFieldEnum = (typeof ProductVariantScalarFieldEnum)[keyof typeof ProductVariantScalarFieldEnum];
export declare const ProductImageScalarFieldEnum: {
    readonly productimage_id: 'productimage_id';
    readonly product_id: 'product_id';
    readonly image_url: 'image_url';
    readonly is_primary: 'is_primary';
    readonly display_order: 'display_order';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type ProductImageScalarFieldEnum = (typeof ProductImageScalarFieldEnum)[keyof typeof ProductImageScalarFieldEnum];
export declare const ProductScalarFieldEnum: {
    readonly product_id: 'product_id';
    readonly product_name: 'product_name';
    readonly description: 'description';
    readonly slug: 'slug';
    readonly status: 'status';
    readonly category_id: 'category_id';
    readonly store_id: 'store_id';
    readonly metadata: 'metadata';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum];
export declare const RefundScalarFieldEnum: {
    readonly refund_id: 'refund_id';
    readonly payment_id: 'payment_id';
    readonly amount: 'amount';
    readonly status: 'status';
    readonly processed_at: 'processed_at';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type RefundScalarFieldEnum = (typeof RefundScalarFieldEnum)[keyof typeof RefundScalarFieldEnum];
export declare const ReturnScalarFieldEnum: {
    readonly return_id: 'return_id';
    readonly order_item_id: 'order_item_id';
    readonly reason: 'reason';
    readonly quantity: 'quantity';
    readonly status: 'status';
    readonly requested_at: 'requested_at';
    readonly approved_at: 'approved_at';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type ReturnScalarFieldEnum = (typeof ReturnScalarFieldEnum)[keyof typeof ReturnScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly review_id: 'review_id';
    readonly buyer_id: 'buyer_id';
    readonly product_id: 'product_id';
    readonly rating: 'rating';
    readonly comment: 'comment';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const SellersPayoutScalarFieldEnum: {
    readonly payout_id: 'payout_id';
    readonly seller_id: 'seller_id';
    readonly amount: 'amount';
    readonly status: 'status';
    readonly paid_at: 'paid_at';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type SellersPayoutScalarFieldEnum = (typeof SellersPayoutScalarFieldEnum)[keyof typeof SellersPayoutScalarFieldEnum];
export declare const ShippingInfoScalarFieldEnum: {
    readonly shipping_id: 'shipping_id';
    readonly order_id: 'order_id';
    readonly courier_name: 'courier_name';
    readonly tracking_number: 'tracking_number';
    readonly shipping_status: 'shipping_status';
    readonly estimated_delivery_date: 'estimated_delivery_date';
    readonly shipped_at: 'shipped_at';
    readonly delivered_at: 'delivered_at';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type ShippingInfoScalarFieldEnum = (typeof ShippingInfoScalarFieldEnum)[keyof typeof ShippingInfoScalarFieldEnum];
export declare const StoreScalarFieldEnum: {
    readonly store_id: 'store_id';
    readonly store_name: 'store_name';
    readonly description: 'description';
    readonly logo: 'logo';
    readonly social_media_account: 'social_media_account';
    readonly status: 'status';
    readonly seller_id: 'seller_id';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type StoreScalarFieldEnum = (typeof StoreScalarFieldEnum)[keyof typeof StoreScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly user_id: 'user_id';
    readonly first_name: 'first_name';
    readonly last_name: 'last_name';
    readonly email: 'email';
    readonly phone_number: 'phone_number';
    readonly hash_password: 'hash_password';
    readonly account_status: 'account_status';
    readonly role: 'role';
    readonly deactivated_at: 'deactivated_at';
    readonly deletion_at: 'deletion_at';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const WishlistScalarFieldEnum: {
    readonly wishlist_id: 'wishlist_id';
    readonly user_id: 'user_id';
    readonly product_id: 'product_id';
    readonly created_at: 'created_at';
    readonly updated_at: 'updated_at';
};
export type WishlistScalarFieldEnum = (typeof WishlistScalarFieldEnum)[keyof typeof WishlistScalarFieldEnum];
export declare const RefreshTokenScalarFieldEnum: {
    readonly refresh_token_id: 'refresh_token_id';
    readonly user_id: 'user_id';
    readonly token_hash: 'token_hash';
    readonly expires_at: 'expires_at';
    readonly revoked_at: 'revoked_at';
    readonly created_at: 'created_at';
};
export type RefreshTokenScalarFieldEnum = (typeof RefreshTokenScalarFieldEnum)[keyof typeof RefreshTokenScalarFieldEnum];
export declare const ResetTokenScalarFieldEnum: {
    readonly reset_token_id: 'reset_token_id';
    readonly user_id: 'user_id';
    readonly token_hash: 'token_hash';
    readonly expires_at: 'expires_at';
    readonly used_at: 'used_at';
    readonly created_at: 'created_at';
};
export type ResetTokenScalarFieldEnum = (typeof ResetTokenScalarFieldEnum)[keyof typeof ResetTokenScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: 'asc';
    readonly desc: 'desc';
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const NullableJsonNullValueInput: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
};
export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput];
export declare const QueryMode: {
    readonly default: 'default';
    readonly insensitive: 'insensitive';
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: 'first';
    readonly last: 'last';
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
export declare const JsonNullValueFilter: {
    readonly DbNull: import("@prisma/client-runtime-utils").DbNullClass;
    readonly JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
    readonly AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
};
export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map