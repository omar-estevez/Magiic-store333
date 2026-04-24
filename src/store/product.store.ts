import { create } from "zustand";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { ProductType } from "../types/product.types";

interface ProductStore {
    products: ProductType[];
    loading: boolean;
    error: string | null;
    getProducts: () => Promise<void>;
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    loading: false,
    error: null,

    getProducts: async () => {
        try {
            set({ loading: true, error: null });

            const productsRef = collection(db, "products");

            const q = query(
                productsRef,
                where("isActive", "==", true)
            );

            const snapshot = await getDocs(q);

            const products = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as ProductType[];

            set({ products, loading: false });
        } catch (error) {
            console.error(error);
            set({
                error: "Error cargando productos",
                loading: false,
            });
        }
    },
}));