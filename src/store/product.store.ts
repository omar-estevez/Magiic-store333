import { create } from "zustand";
import { addDoc, collection, deleteDoc, doc, getDocs, query, updateDoc, where } from "firebase/firestore";
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
    deleteProduct: (id: string) => Promise<void>;
    updateProduct: (
        id: string,
        changes: Partial<ProductType>
    ) => Promise<void>;
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

    addProduct: async (product) => {
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

            throw error;
        }
    },

    updateProduct: async (id, changes) => {
        try {
            set({ loading: true, error: null });

            await updateDoc(doc(db, "products", id), changes);

            set((state) => ({
                allProducts: state.allProducts.map((product) =>
                    product.id === id
                        ? { ...product, ...changes }
                        : product
                ),

                products: state.products.map((product) =>
                    product.id === id
                        ? { ...product, ...changes }
                        : product
                ),

                loading: false,
            }));

        } catch (error) {
            console.error(error);

            set({
                error: "Error actualizando producto",
                loading: false,
            });

            throw error;
        }
    },

    deleteProduct: async (id) => {
        try {
            set({ loading: true, error: null });

            await deleteDoc(doc(db, "products", id));

            set((state) => ({
                allProducts: state.allProducts.filter(
                    (product) => product.id !== id
                ),

                products: state.products.filter(
                    (product) => product.id !== id
                ),

                loading: false,
            }));

        } catch (error) {
            console.error(error);

            set({
                error: "Error eliminando producto",
                loading: false,
            });

            throw error;
        }
    },
}));