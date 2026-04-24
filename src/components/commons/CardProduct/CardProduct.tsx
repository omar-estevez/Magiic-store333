import { FaArrowRight } from "react-icons/fa6"
import { Button } from "../Button/Button"
import style from "./CardProduct.module.css"
import type { ProductType } from "../../../types/product.types";

export interface CardProductProps {
    object: ProductType;
}

export const CardProduct = ({ object }: CardProductProps) => {
    return (
        <div className={style.card__container}>
            <div className={style.img__container}>
                <img src={object.imageUrl} alt="" />
            </div>
            <div className={style.title__container}>
                <h4>{object.category}</h4>
                <h3>{object.name}</h3>
            </div>
            <div className={style.btn__container}>
                <p>${object.price}</p>
                <Button text="Ver Detalles" right_icon={<FaArrowRight />} />
            </div>
        </div>
    )
}
