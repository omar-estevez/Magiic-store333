import { CardLogin } from './card/CardLogin';
import style from './LoginContainer.module.css';

export const LoginContainer = () => {
    return (
        <div className={style.container}>
            <CardLogin />
        </div>
    )
}
