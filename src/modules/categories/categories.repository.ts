import { db } from "../../config/db";
import { CreateCategory } from "./categories.types";

export const createCategory = async (data: CreateCategory) => {
  return db.category.create({
    data: {
      category_name: data.categoryName,
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

export const findCategoryByName = async (categoryName: string) => {
    return db.category.findUnique({
        where: {
            category_name: categoryName,
        },
    });
};