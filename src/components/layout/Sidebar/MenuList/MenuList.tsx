import { useNavigate } from "react-router-dom"
import { navigationMenu } from "../../../../data/sidebar"
import style from './MenuList.module.css'

export const MenuList = () => {

    const navigate = useNavigate();

    return (
        <div className={style.menuside__container}>
            {
                navigationMenu.map((data) => (
                    <div key={data.id} className={style.menu__options} onClick={() => navigate(data.url)}>
                        <data.icon />
                        <span>{data.title}</span>
                    </div>
                ))
            }
        </div>
    )
}
