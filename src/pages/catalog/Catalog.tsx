// import maintenanceImg from '../../assets/images/mantenimiento.png';
import { useEffect, useState } from 'react';
import { FilterBar } from '../../components/sections/catalog/filterbar/FilterBar';
import { ProductGrid } from '../../components/sections/catalog/productgrid/ProductGrid';
import { SearchBar } from '../../components/sections/catalog/searchbar/SearchBar';
import style from './Catalog.module.css';
import { useProductStore } from '../../store/product.store';

export const Catalog = () => {

    const [searchText, setSearchText] = useState("");

    const [activeDepartment, setActiveDepartment] = useState("all");
    const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

    const { products, loading, error, getProducts } = useProductStore();

    useEffect(() => {
        getProducts();
    }, [getProducts]);

    return (
        // <div style={{ margin: '5rem', maxWidth: '100%' }}>
        //     <img style={{ height: 'auto', width: '100%' }} src={maintenanceImg} alt="" />
        // </div>
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
