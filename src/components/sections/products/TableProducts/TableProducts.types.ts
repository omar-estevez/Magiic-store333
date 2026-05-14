import type { Dispatch, SetStateAction } from "react";

export interface TableProductsProps {
    setEditProduct: Dispatch<SetStateAction<string | null>>;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>;
}