import { Button } from '../../components/commons/Button/Button'
import { useAuthStore } from '../../store/auth.store';

export const Dashboard = () => {

    const { logout } = useAuthStore();

    return (
        <div>
            Dash

            <Button as='button' text="logout" onClick={logout} />
        </div>
    )
}
