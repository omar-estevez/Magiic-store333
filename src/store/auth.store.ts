import { create } from "zustand";
import {
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
    type User,
} from "firebase/auth";
import { auth } from "../lib/firebase";
import { FirebaseError } from "firebase/app";

interface AuthStore {
    user: User | null;
    loadingAuth: boolean;
    errorAuth: string | null;

    login: (email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    listenAuth: () => () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    user: null,
    loadingAuth: true,
    errorAuth: null,

    login: async (email, password) => {
        try {
            set({ loadingAuth: true, errorAuth: null });

            console.log(email, password)

            const res = await signInWithEmailAndPassword(auth, email, password);

            set({
                user: res.user,
                loadingAuth: false,
            });

            return true;
        } catch (error) {
            console.log(error)

            let message = "Email o contraseña incorrectos";

            if (error instanceof FirebaseError) {
                if (error.code === "auth/too-many-requests") {
                    message = `Demasiados intentos. Espera unos minutos e intenta de nuevo.`;
                }
            }

            set({
                errorAuth: message,
                loadingAuth: false,
            });

            return false;
        }
    },

    logout: async () => {
        await signOut(auth);
        set({ user: null });
    },

    listenAuth: () => {
        return onAuthStateChanged(auth, (user) => {
            set({
                user,
                loadingAuth: false,
            });
        });
    },
}));