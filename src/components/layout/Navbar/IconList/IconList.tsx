import { FiShoppingCart } from "react-icons/fi";
import { BsPerson } from "react-icons/bs";
import style from './IconList.module.css';
import clsx from "clsx";

interface Props {
    mobileMenu: boolean;
}

export const IconList = ({ mobileMenu }: Props) => {
    return (
        <div className={clsx(style.icons__container, mobileMenu && style.active)}>
            <a>
                <FiShoppingCart />
            </a>
            <a>
                <BsPerson />
            </a>
        </div>
    )
}
