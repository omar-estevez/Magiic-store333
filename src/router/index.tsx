import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { PublicLayout } from "../layouts/PublicLayout";
import { Catalog } from "../pages/catalog/Catalog";
import { AuthLayout } from "../layouts/AuthLayout";
import { Login } from "../pages/auth/Login";
import { Contact } from "../pages/contact/Contact";
import { useAuthStore } from "../store/auth.store";
import { useEffect } from "react";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { PrivateRoute } from "./PrivateRoute";
import { Products } from "../pages/dashboard/Products";

export default function Router() {

    const { listenAuth } = useAuthStore();

    useEffect(() => {
        const unsubscribe = listenAuth();

        return () => unsubscribe();
    }, [listenAuth]);


    return (
        <Routes>
            {/* públicas */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/catalogo" element={<Catalog />} />
                <Route path="/contacto" element={<Contact />} />
            </Route>

            {/* auth */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>

            {/* privadas */}
            <Route path="/dashboard" element={<PrivateRoute />}>
                <Route element={<DashboardLayout />}>
                    <Route index element={<Dashboard />} />
                    <Route path="productos" element={<Products />} />
                </Route>
            </Route>
        </Routes>
    );
}