import type { ProductType } from "../../../../types/product.types";

export interface ProductGridProps {
    activeDepartment: string;
    selectedTypes: string[];
    products: ProductType[];
    loading: boolean;
    error: string | null;
}