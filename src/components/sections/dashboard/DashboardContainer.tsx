import { useEffect } from "react";
import { useProductStore } from "../../../store/product.store";
import style from './DashboardContainer.module.css'
import { Counter } from "../../commons/Counter/Counter";

export const DashboardContainer = () => {

    const { allProducts, loading, error, getAllProducts } = useProductStore();

    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);

    if (error) return <>Hubo un error, intente nuevamente...</>

    return (
        <div className={style.stats__container}>
            <div className={style.stats__grid}>
                <div className={style.stats__card}>
                    <span>Productos</span>
                    <strong><Counter value={loading ? 0 : allProducts.length} /></strong>
                </div>

                <div className={style.stats__card}>
                    <span>Productos activos</span>
                    <strong><Counter value={loading ? 0 : (allProducts.filter((data) => data.isActive === true)).length} /></strong>
                </div>

                <div className={style.stats__card}>
                    <span>Productos inactivos</span>
                    <strong><Counter value={loading ? 0 : (allProducts.filter((data) => data.isActive === false)).length} /></strong>
                </div>

                <div className={style.stats__card}>
                    <span>Productos Populares</span>
                    <strong><Counter value={loading ? 0 : (allProducts.filter((data) => data.popular === true && data.isActive === true)).length} /></strong>
                </div>
            </div>
        </div>
    )
}
