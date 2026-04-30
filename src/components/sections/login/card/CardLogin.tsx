import { FormLogin } from "../form/FormLogin"
import style from './CardLogin.module.css'

export const CardLogin = () => {
    return (
        <div className={style.card__container}>
            <FormLogin />
        </div>
    )
}
