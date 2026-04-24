import type { ProductType } from "../../../../../types/product.types";

export interface PaginatedItemsProps {
    itemsPerPage: number;
    activeDepartment: string;
    selectedTypes: string[];
    products: ProductType[];
    loading: boolean;
    error: string | null;
}