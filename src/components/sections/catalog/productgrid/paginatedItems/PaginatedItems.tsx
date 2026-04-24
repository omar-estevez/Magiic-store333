import { useState } from 'react';
import { ProductContainers } from '../productcontainers/ProductContainers';
import style from './PaginatedItems.module.css';
import type { PaginatedItemsProps } from './PaginatedItems.types';

export const PaginatedItems = ({ itemsPerPage, activeDepartment, selectedTypes, products, loading, error }: PaginatedItemsProps) => {

    const [page, setPage] = useState(1);

    const filteredProducts = products.filter((product) => {
        const matchDepartment =
            activeDepartment === "all" || product.department === activeDepartment;

        const matchType =
            selectedTypes.length === 0 || selectedTypes.includes(product.category);

        return matchDepartment && matchType;
    });

    const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
    const start = (page - 1) * itemsPerPage;
    const currentItems = filteredProducts.slice(start, start + itemsPerPage);

    if (loading) return <p>Cargando productos...</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
            <ProductContainers itemsArray={currentItems} />

            <div className={style.pagination}>
                <button
                    className={style.pagination__btn}
                    disabled={page === 1}
                    onClick={() => setPage(page - 1)}
                >
                    &lt;
                </button>

                {Array.from({ length: totalPages }, (_, index) => (
                    <button
                        key={index}
                        className={page === index + 1 ? (style.pagination__number__active) : ''}
                        onClick={() => setPage(index + 1)}
                    >
                        {index + 1}
                    </button>
                ))}

                <button
                    className={style.pagination__btn}
                    disabled={page === totalPages}
                    onClick={() => setPage(page + 1)}
                >
                    &gt;
                </button>
            </div>
        </>
    )
}
