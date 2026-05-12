import type { Dispatch, SetStateAction } from "react";

export interface FormModalProps {
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
}

export interface formModalType {
    name: string;
    category: string;
    department: string;
    price: string;
    sizes: string[];
    stock: Record<string, number>;
}

export interface formModalErrors {
    name?: string;
    category?: string;
    department?: string;
    price?: string;
    sizes?: string;
    stock?: string;
}