export interface ProductType {
    id?: string;
    name: string;
    price: number;
    category: string;
    department: string;
    imageUrl: string[];
    description?: string;
    isActive: boolean;
    popular: boolean;
    stock: Record<string, number>;
    sizes: string[];
    createdAt?: unknown;
}