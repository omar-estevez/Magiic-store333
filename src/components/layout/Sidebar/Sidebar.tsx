import { BiLogOut } from "react-icons/bi";
import { useAuthStore } from "../../../store/auth.store";
import { Button } from "../../commons/Button/Button";
import { MenuList } from "./MenuList/MenuList";
import style from './Sidebar.module.css'
import logo_no_bg from '../../../assets/images/Logo_diamond_nobg.png'

export const Sidebar = () => {

    const { logout } = useAuthStore();

    return (
        <div className={style.sidebar__container}>

            <div className={style.menu_container}>
                <img src={logo_no_bg} alt="Logo" />

                <MenuList />
            </div>



            <div className={style.btn__container}>
                <Button as='button' text="logout" onClick={logout} left_icon={<BiLogOut style={{ marginRight: "0.2rem" }} />} />
            </div>
        </div>
    )
}
