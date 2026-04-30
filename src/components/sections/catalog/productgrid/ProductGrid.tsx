import { PaginatedItems } from "./paginatedItems/PaginatedItems";
import style from './ProductGrid.module.css';
import type { ProductGridProps } from "./ProductGrid.types";

export const ProductGrid = ({ activeDepartment, selectedTypes, products, loading, error, searchText }: ProductGridProps) => {
    return (
        <div className={style.catalog__container}>
            <h2>Catalogo</h2>

            <PaginatedItems
                key={`${activeDepartment}-${selectedTypes.join("-")}`}
                itemsPerPage={6}
                activeDepartment={activeDepartment}
                selectedTypes={selectedTypes}
                products={products}
                loading={loading}
                error={error}
                searchText={searchText}
            />
        </div>
    )
}
