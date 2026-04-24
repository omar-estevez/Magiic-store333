export interface ProductType {
    id: string;
    name: string;
    price: number;
    category: string;
    department: string;
    imageUrl: string;
    description?: string;
    active: boolean;
    popular: boolean;
    createdAt?: unknown;
}