import { Navigate } from 'react-router-dom';
import { CardLogin } from './card/CardLogin';
import style from './LoginContainer.module.css';
import { useAuthStore } from '../../../store/auth.store';

export const LoginContainer = () => {
    const { user, loadingAuth } = useAuthStore();

    if (loadingAuth) return <p>Cargando...</p>;

    if (user) return <Navigate to="/dashboard" replace />;

    return (
        <div className={style.container}>
            <CardLogin />
        </div>
    )
}
