import { create } from "zustand";
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { db } from "../lib/firebase";
import type { ProductType } from "../types/product.types";

interface ProductStore {
    products: ProductType[];
    allProducts: ProductType[];
    product: ProductType | null;
    loading: boolean;
    error: string | null;
    getActiveProducts: () => Promise<void>;
    getAllProducts: () => Promise<void>;
    getProduct: (id: string) => Promise<void>;
    addProduct: (
        product: Omit<ProductType, "id">
    ) => Promise<string | undefined>;
    deleteProduct: (id: string) => Promise<void>;
    updateProduct: (
        id: string,
        changes: Partial<ProductType>
    ) => Promise<void>;
    clearProduct: () => void;
}

export const useProductStore = create<ProductStore>((set) => ({
    products: [],
    allProducts: [],
    product: null,
    loading: false,
    error: null,

    getActiveProducts: async () => {
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

    getProduct: async (id) => {
        try {
            set({ loading: true, error: null, product: null });

            const productRef = doc(db, "products", id);

            const snapshot = await getDoc(productRef);

            if (!snapshot.exists()) {
                set({
                    product: null,
                    loading: false,
                    error: "Producto no encontrado",
                });

                return;
            }

            const product = {
                id: snapshot.id,
                ...snapshot.data(),
            } as ProductType;

            set({ product, loading: false });
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
    clearProduct: () => set({ product: null }),
}));