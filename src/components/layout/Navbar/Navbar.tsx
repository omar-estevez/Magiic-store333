import { MenuList } from './MenuList/MenuList';
import style from './Navbar.module.css';
import logo from "../../../assets/images/Logo_diamond_nobg.png";
import { IconList } from './IconList/IconList';
import { useEffect, useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import clsx from 'clsx';

export const Navbar = () => {

    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const onScroll = () => {
            if (!open) {
                setScrolled(window.scrollY > 40);
            }
        };

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, [open]);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [open]);

    return (
        <nav className={clsx(style.nav__container, scrolled && style.nav__container__scroll)}>
            <div className={style.nav__subcontainer}>
                <div className={style.nav__items__container}>
                    <div className={style.img__container}>
                        <img src={logo} alt='magic_store' />
                    </div>
                    <button className={style.menu__toggle} onClick={() => setOpen(!open)} > {open ? <FiX /> : <FiMenu />}</button>
                    <MenuList mobileMenu={open} />
                    <IconList mobileMenu={open} />
                </div>
            </div>

        </nav>
    )
}
