import { CreateCategory } from "./categories.types";
export declare const createCategoryService: (sellerId: number, data: CreateCategory) => Promise<{
    category_id: number;
    category_name: string;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const findCategoryByIdService: (categoryId: number) => Promise<{
    category_id: number;
    category_name: string;
    created_at: Date | null;
    updated_at: Date | null;
}>;
//# sourceMappingURL=categories.service.d.ts.map