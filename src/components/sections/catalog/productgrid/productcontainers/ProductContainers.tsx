import type { ProductType } from "../../../../../types/product.types";
import { CardProduct } from "../../../../commons/CardProduct/CardProduct";
import style from './ProductContainer.module.css';

interface ProductContainersProps {
    itemsArray: ProductType[];
}

export const ProductContainers = ({ itemsArray }: ProductContainersProps) => {
    return (
        <div className={style.product__container}>
            {
                itemsArray && itemsArray.map((product) => (
                    <CardProduct key={product.id} object={product} />
                ))
            }
        </div>
    )
}
