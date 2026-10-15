"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findCategoryByName = exports.findCategoryById = exports.createCategory = void 0;
const db_1 = require("../../config/db");
const createCategory = async (data) => {
    return db_1.db.category.create({
        data: {
            category_name: data.categoryName,
        },
    });
};
exports.createCategory = createCategory;
const findCategoryById = async (categoryId) => {
    return db_1.db.category.findUnique({
        where: {
            category_id: categoryId,
        },
    });
};
exports.findCategoryById = findCategoryById;
const findCategoryByName = async (categoryName) => {
    return db_1.db.category.findUnique({
        where: {
            category_name: categoryName,
        },
    });
};
exports.findCategoryByName = findCategoryByName;
//# sourceMappingURL=categories.repository.js.map