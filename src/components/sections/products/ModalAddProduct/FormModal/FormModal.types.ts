import type { Dispatch, SetStateAction } from "react";

export interface FormModalProps {
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
    initialValues: formModalType;
    idProduct: string | null;
}

export interface formModalType {
    name: string;
    slug: string;
    category: string;
    department: string;
    price: string;
    sizes: string[];
    stock: Record<string, number>;
    imageUrl: ImageType[];
    isActive: boolean;
    popular: boolean;
}

export interface formModalErrors {
    name?: string;
    slug?: string;
    category?: string;
    department?: string;
    price?: string;
    sizes?: string;
    stock?: string;
    imageUrl?: string;
    isActive?: string;
    popular?: string;
}

export type ImageType = {
    file?: File;
    preview: string;
    id: string;
};