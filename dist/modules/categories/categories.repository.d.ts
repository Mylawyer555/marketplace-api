import { CreateCategory } from "./categories.types";
export declare const createCategory: (data: CreateCategory) => Promise<{
    category_id: number;
    category_name: string;
    created_at: Date | null;
    updated_at: Date | null;
}>;
export declare const findCategoryById: (categoryId: number) => Promise<{
    category_id: number;
    category_name: string;
    created_at: Date | null;
    updated_at: Date | null;
} | null>;
export declare const findCategoryByName: (categoryName: string) => Promise<{
    category_id: number;
    category_name: string;
    created_at: Date | null;
    updated_at: Date | null;
} | null>;
//# sourceMappingURL=categories.repository.d.ts.map