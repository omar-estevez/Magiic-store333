import { Routes, Route } from "react-router-dom";
import { Home } from "../pages/home/Home";
import { PublicLayout } from "../layouts/PublicLayout";
import { Catalog } from "../pages/catalog/Catalog";
import { AuthLayout } from "../layouts/AuthLayout";
import { Login } from "../pages/auth/Login";

export default function Router() {
    return (
        <Routes>
            {/* públicas */}
            <Route element={<PublicLayout />}>
                <Route path="/" element={<Home />} />
                <Route path="/catalog" element={<Catalog />} />
            </Route>

            {/* auth */}
            <Route element={<AuthLayout />}>
                <Route path="/login" element={<Login />} />
            </Route>
        </Routes>
    );
}