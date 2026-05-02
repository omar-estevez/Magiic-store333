import { FiShoppingCart } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import style from './IconList.module.css';
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import type { Dispatch, SetStateAction } from "react";

interface Props {
    mobileMenu: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const IconList = ({ mobileMenu, setOpen }: Props) => {
    return (
        <div className={clsx(style.icons__container, mobileMenu && style.active)}>
            <a>
                <FiShoppingCart />
            </a>

            <NavLink to="/login"><BsPerson data-tooltip-id="my-tooltip" data-tooltip-content="Inicia Sesion" data-tooltip-place="bottom" onClick={() => setOpen(false)} /></NavLink>

            <Tooltip id="my-tooltip" />
        </div>
    )
}
