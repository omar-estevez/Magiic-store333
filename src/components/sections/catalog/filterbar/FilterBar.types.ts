import type { ProductType } from "../../../../types/product.types";

export interface FilterBarProps {
    activeDepartment: string;
    selectedTypes: string[];
    setActiveDepartment: (value: string) => void;
    setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
    products: ProductType[];
    setSearchText: React.Dispatch<React.SetStateAction<string>>;
}