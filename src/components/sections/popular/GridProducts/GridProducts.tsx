import { useEffect } from "react";
import { useProductStore } from "../../../../store/product.store";
import { CardProduct } from "../../../commons/CardProduct/CardProduct"
import style from './GridProducts.module.css'

export const GridProducts = () => {

    const { products, loading, error, getProducts } = useProductStore();

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    const filteredProducts = products.filter((product) => {

        const popularProducts = product.popular === true;

        return popularProducts;
    });

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className={style.cards__container}>
            {
                filteredProducts.map((product) => (
                    <CardProduct key={product.id} object={product} />
                ))
            }

        </div>
    )
}
