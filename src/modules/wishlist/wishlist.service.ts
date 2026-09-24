import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import { createWishList, findProductById, findWishlist, findWishlistById, findWishListByUserId, deleteWishlist } from "./wishlist.repository";
import { AddWishList } from "./wishlist.types";

export const addWishlistService = async (userId: number, data: AddWishList) => {
    const product = await findProductById(data.productId);

    if (!product) {
        throw new AppError("Product does not exist", StatusCodes.NOT_FOUND);
    };

    if (product.status !== "ACTIVE") {
        throw new AppError("Product must be active to add to wishlist", StatusCodes.FORBIDDEN);
    };

    const isProductInWishlist = await findWishlist(userId, data.productId);

    if (isProductInWishlist) {
        throw new AppError("Product already added to wishlist", StatusCodes.CONFLICT);
    };

    return await createWishList(userId, data);
}; 

export const getWishLishService = async (userId: number) => {
    const wishList = await findWishListByUserId(userId);

    if (!wishList) {
        return {
            data: [],
        }
    }

    return wishList;
}

export const deleteWishlistService = async (wishlistId: number, userId:number) => {
    const isWishlistExist = await findWishlistById(wishlistId);

    if (!isWishlistExist) {
        throw new AppError("No record of wishlist found!", StatusCodes.NOT_FOUND);
    };

    if (isWishlistExist.user_id !== userId) {
        throw new AppError("You're not permitted to perform this action", StatusCodes.FORBIDDEN);
    };

    return await deleteWishlist(wishlistId);

};