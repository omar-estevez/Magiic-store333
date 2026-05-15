import { FaArrowRight } from "react-icons/fa6"
import { Button } from "../Button/Button"
import style from "./CardProduct.module.css"
import type { ProductType } from "../../../types/product.types";
import { useNavigate } from "react-router-dom";
import { formatPriceCop } from "../../../utils/formatPriceCop";

export interface CardProductProps {
    object: ProductType;
}

export const CardProduct = ({ object }: CardProductProps) => {

    const navigate = useNavigate();

    return (
        <div className={style.card__container}>
            <div className={style.img__container}>
                <img src={object.imageUrl[0]} alt="" />
            </div>
            <div className={style.title__container}>
                <h4>{object.category}</h4>
                <h3>{object.name}</h3>
            </div>
            <div className={style.btn__container}>
                <p>{formatPriceCop(object.price)}</p>
                <Button as="button" variant="secondary" text="Detalles" right_icon={<FaArrowRight />} onClick={() => navigate(`/catalogo/${object.slug}`)} />
            </div>
        </div>
    )
}
