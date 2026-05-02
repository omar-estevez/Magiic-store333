import clsx from "clsx";
import { navigationMenu } from "../../../../data/nav";
import style from "./MenuList.module.css";
import { NavLink } from "react-router-dom";
import type { Dispatch, SetStateAction } from "react";

interface Props {
    mobileMenu: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const MenuList = ({ mobileMenu, setOpen }: Props) => {
    return (
        <div className={clsx(style.menulist__container, mobileMenu && style.active)}>
            {
                navigationMenu.map((data) => (
                    <NavLink key={data.id} to={data.url} onClick={() => setOpen(false)}>{data.title}</NavLink>
                ))
            }
        </div>
    )
}
