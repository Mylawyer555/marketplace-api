"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../../middlewares/auth.middleware");
const wishlist_controller_1 = require("./wishlist.controller");
const wishlistRoute = express_1.default.Router();
wishlistRoute.post("/", auth_middleware_1.authenticate, wishlist_controller_1.addWishListController);
wishlistRoute.get("/", auth_middleware_1.authenticate, wishlist_controller_1.getWishListController);
wishlistRoute.delete("/:wishlistId", auth_middleware_1.authenticate, wishlist_controller_1.deleteWishListController);
exports.default = wishlistRoute;
//# sourceMappingURL=wishlist.route.js.map