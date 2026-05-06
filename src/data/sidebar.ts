import { IoHomeOutline } from "react-icons/io5";
import type { sideMenu } from "../types/side.types";
import { AiOutlineProduct } from "react-icons/ai";

export const navigationMenu: sideMenu[] = [
    {
        id: "Inicio",
        title: "Inicio",
        url: "/dashboard",
        icon: IoHomeOutline
    },
    {
        id: "productos",
        title: "Productos",
        url: "/dashboard/productos",
        icon: AiOutlineProduct
    },
    // {
    //     id: "contacto",
    //     title: "Contacto",
    //     url: "/contacto"
    // }
]