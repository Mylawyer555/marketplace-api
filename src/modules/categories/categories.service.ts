import { StatusCodes } from "http-status-codes";
import { AppError } from "../../utils/AppError";
import { createCategory, findCategoryById, findCategoryByName } from "./categories.repository";
import { CreateCategory } from "./categories.types";
import { findUserById } from "../auth/auth.repository";
import { findStoreBySellerId } from "../stores/stores.repository";

export const createCategoryService = async ( sellerId: number, data: CreateCategory) => {
    const user = await findUserById(sellerId);
    if (!user) {
        throw new AppError("user does not exist!", StatusCodes.NOT_FOUND);
    };

    if (user.role !== "SELLER") {
        throw new AppError("user must be a seller", StatusCodes.FORBIDDEN);
    };
   
    const isCategoryExist = await findCategoryByName(data.categoryName);
    if (isCategoryExist) {
        throw new AppError("category already exist!", StatusCodes.CONFLICT);
    };

    return await createCategory(data);
};

export const findCategoryByIdService = async (categoryId: number) => {
    const category = await findCategoryById(categoryId);
    if (!category) {
        throw new AppError("Category does not exist", StatusCodes.NOT_FOUND);
    };

    return category;
};
