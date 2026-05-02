import { useAuthStore } from "../store/auth.store";
import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoute = () => {
    const { user, loadingAuth } = useAuthStore();

    if (loadingAuth) return <p>Cargando...</p>;

    if (!user) return <Navigate to="/login" replace />;

    return <Outlet />;
}
