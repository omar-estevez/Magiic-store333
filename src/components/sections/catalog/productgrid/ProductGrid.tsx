import { ProductContainers } from "./productcontainers/ProductContainers";
import style from './ProductGrid.module.css';

export const ProductGrid = () => {
    return (
        <div className={style.catalog__container}>
            <h2>Catalogo</h2>

            <ProductContainers />
        </div>
    )
}
