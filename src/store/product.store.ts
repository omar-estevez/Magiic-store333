import { create } from "zustand";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { ProductType } from "../types/product.types";

interface ProductStore {
    products: ProductType[];
    allProducts: ProductType[];
    loading: boolean;
    error: string | null;
    getProducts: () => Promise<void>;
    getAllProducts: () => Promise<void>;
    addProduct: (
        product: Omit<ProductType, "id">
    ) => Promise<string | undefined>;
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    allProducts: [],
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

    getAllProducts: async () => {
        try {
            set({ loading: true, error: null });

            const productsRef = collection(db, "products");

            const q = query(
                productsRef,
            );

            const snapshot = await getDocs(q);

            const allProducts = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            })) as ProductType[];

            set({ allProducts, loading: false });
        } catch (error) {
            console.error(error);
            set({
                error: "Error cargando productos",
                loading: false,
            });
        }
    },

    addProduct: async (product: Omit<ProductType, "id">) => {
        try {
            set({ loading: true, error: null });

            const productsRef = collection(db, "products");

            const docRef = await addDoc(productsRef, {
                ...product,
                createdAt: new Date(),
            });

            set((state) => ({
                allProducts: [
                    ...state.allProducts,
                    {
                        id: docRef.id,
                        ...product,
                    },
                ],
                loading: false,
            }));

            return docRef.id;
        } catch (error) {
            console.error(error);

            set({
                error: "Error agregando producto",
                loading: false,
            });
        }
    },
}));