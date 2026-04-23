import { FaFacebook, FaInstagram } from "react-icons/fa6";
import type { footerContact, footerNav } from "../types/footer.types";

export const navigationFooter: footerNav[] = [
    {
        id: 'home',
        name: 'Home',
        url: ''
    },
    {
        id: 'catalogo',
        name: 'Catalogo',
        url: ''
    },
    {
        id: 'contacto',
        name: 'Contacto',
        url: ''
    }
]

export const contactFooter: footerContact[] = [
    {
        id: 'facebook',
        icon: FaFacebook,
        url: ''
    },
    {
        id: 'instagram',
        icon: FaInstagram,
        url: ''
    }
]