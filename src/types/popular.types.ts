export interface popularSectionType {
    title: string;
    popular_products: popularType;
}

export interface popularType {
    type: string;
    name: string;
    price: number,
    url: string;
}