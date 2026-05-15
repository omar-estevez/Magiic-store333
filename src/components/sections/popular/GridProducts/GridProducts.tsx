import { useEffect } from "react";
import { useProductStore } from "../../../../store/product.store";
import { CardProduct } from "../../../commons/CardProduct/CardProduct"
import style from './GridProducts.module.css'
import { LoaderSection } from "../../../commons/LoaderSection/LoaderSection";

export const GridProducts = () => {

    const { products, loading, error, getActiveProducts } = useProductStore();

    useEffect(() => {
        getActiveProducts();
    }, [getActiveProducts]);

    const filteredProducts = products.filter((product) => {

        const popularProducts = product.popular === true;

        return popularProducts;
    });

    if (loading) return <LoaderSection text="Cargando Productos Populares..." />;
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
