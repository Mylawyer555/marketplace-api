import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import { findUserById } from "../auth/auth.repository";
import { CreateProduct } from "./products.type";
import { findStoreBySellerId } from "../stores/stores.repository";
import { createProduct, findCategoryById, findProductBySlug } from "./products.repository";
import { generateSlug } from "../../utils/createSlug";

export const createProductService = async (sellerId:number, data: CreateProduct) => {
    //authenticate user
    const user = await findUserById(sellerId);

    if (!user) {
        throw new AppError("User not found", StatusCodes.NOT_FOUND);
    };

    if (user.role !== "SELLER") {
        throw new AppError("User must be a seller", StatusCodes.FORBIDDEN);
    };

    const store = await findStoreBySellerId(user.user_id);

    if (!store) {
        throw new AppError("oops!, seller must have a store in other to add products.", StatusCodes.FORBIDDEN);
    };

    if (store.status !== "ACTIVE") {
        throw new AppError("Store is inactive, please active your store to proceed.", StatusCodes.FORBIDDEN);
    };
    

    const isCategoryExist = await findCategoryById(data.categoryId)
    if (!isCategoryExist){
        throw new AppError("Category does not exist", StatusCodes.NOT_FOUND);
    };


    const newSlug = generateSlug(data.productName);

    const uniqueSlug = await findProductBySlug(newSlug)

    if (uniqueSlug) {
        throw new AppError("Slug already exist", StatusCodes.BAD_REQUEST);
    };

    return await createProduct(store.store_id, data, newSlug);


}