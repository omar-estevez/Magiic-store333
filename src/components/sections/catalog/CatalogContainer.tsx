import { useEffect, useState } from "react";
import { FilterBar } from "./filterbar/FilterBar";
import { ProductGrid } from "./productgrid/ProductGrid";
import { SearchBar } from "./searchbar/SearchBar";
import { useProductStore } from "../../../store/product.store";
import style from './CatalogContainer.module.css';

export const CatalogContainer = () => {

    const [searchText, setSearchText] = useState("");

    const [activeDepartment, setActiveDepartment] = useState("all");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const { products, loading, error, getProducts } = useProductStore();

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        <div className={style.container}>
            <div className={style.top}>
                <SearchBar searchText={searchText} setSearchText={setSearchText} />
            </div>
            <div className={style.left}>
                {!searchText && <FilterBar
                    activeDepartment={activeDepartment}
                    selectedTypes={selectedTypes}
                    setActiveDepartment={setActiveDepartment}
                    setSelectedTypes={setSelectedTypes}
                    products={products}
                    setSearchText={setSearchText}
                />}
            </div>
            <div className={style.right}>
                <ProductGrid
                    activeDepartment={activeDepartment}
                    selectedTypes={selectedTypes}
                    products={products}
                    loading={loading}
                    error={error}
                    searchText={searchText}
                />
            </div>
        </div>
    )
}
