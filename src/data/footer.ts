import { FaFacebook, FaInstagram } from "react-icons/fa6";
import type { footerContact, footerNav } from "../types/footer.types";

export const navigationFooter: footerNav[] = [
    {
        id: 'home',
        name: 'Home',
        url: '/'
    },
    {
        id: 'catalogo',
        name: 'Catalogo',
        url: '/catalogo'
    },
    {
        id: 'contacto',
        name: 'Contacto',
        url: '/contacto'
    }
]

export const contactFooter: footerContact[] = [
    {
        id: 'facebook',
        icon: FaFacebook,
        url: 'https://www.facebook.com/people/Magiicstore333/61573531187625/'
    },
    {
        id: 'instagram',
        icon: FaInstagram,
        url: 'https://www.instagram.com/magiicstore333/'
    }
]