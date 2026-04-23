import clsx from "clsx";
import { navigationMenu } from "../../../../data/nav";
import style from "./MenuList.module.css";

interface Props {
    mobileMenu: boolean;
}

export const MenuList = ({ mobileMenu }: Props) => {
    return (
        <div className={clsx(style.menulist__container, mobileMenu && style.active)}>
            {
                navigationMenu.map((data) => (
                    <a key={data.id}>
                        {data.title}
                    </a>
                ))
            }
        </div>
    )
}
