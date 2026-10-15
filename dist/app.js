"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const err_middleware_1 = require("./middlewares/err.middleware");
const cors_1 = __importDefault(require("cors"));
const auth_route_1 = __importDefault(require("./modules/auth/auth.route"));
const sellers_route_1 = __importDefault(require("./modules/seller/sellers.route"));
const stores_route_1 = __importDefault(require("./modules/stores/stores.route"));
const products_routes_1 = __importDefault(require("./modules/products/products.routes"));
const categories_routes_1 = __importDefault(require("./modules/categories/categories.routes"));
const cart_routes_1 = __importDefault(require("./modules/cart/cart.routes"));
const wishlist_route_1 = __importDefault(require("./modules/wishlist/wishlist.route"));
const checkout_routes_1 = __importDefault(require("./modules/checkout/checkout.routes"));
const orders_routes_1 = __importDefault(require("./modules/orders/orders.routes"));
const payments_routes_1 = __importDefault(require("./modules/payments/payments.routes"));
const app = (0, express_1.default)();
//core middleware
app.use((0, cors_1.default)());
app.use(express_1.default.json());
//health check
app.get("/", (req, res) => {
    res.json({
        message: "MarketPlace is running",
    });
});
app.use("/api/v1/auth", auth_route_1.default);
app.use("/api/v1/sellers", sellers_route_1.default);
app.use("/api/v1/stores", stores_route_1.default);
app.use("/api/v1/products", products_routes_1.default);
app.use("/api/v1/categories", categories_routes_1.default);
app.use("/api/v1/cart", cart_routes_1.default);
app.use("/api/v1/wishlist", wishlist_route_1.default);
app.use("/api/v1/checkout", checkout_routes_1.default);
app.use("/api/v1/orders", orders_routes_1.default);
app.use("/api/v1/payments", payments_routes_1.default);
// Global Error handler
app.use(err_middleware_1.errorHandler);
exports.default = app;
//# sourceMappingURL=app.js.map