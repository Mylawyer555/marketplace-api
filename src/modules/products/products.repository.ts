import { db } from "../../config/db";
import { CreateProduct } from "./products.type";

export const createProduct = async (storeId: number, data: CreateProduct, slug: string) => {
    return db.product.create({
        data: {
            store_id: storeId,
            product_name: data.productName,
            description: data.description,
            category_id: data.categoryId,
            slug
        }
    });
};


export const findProductBySlug = async (slug: string) => {
    return db.product.findUnique({
        where: {
            slug,
        },
    });
};

export const findCategoryById = async (categoryId: number) => {
    return db.category.findUnique({
        where: {
            category_id: categoryId,
        },
    });
};