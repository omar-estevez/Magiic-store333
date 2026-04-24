// import maintenanceImg from '../../assets/images/mantenimiento.png';
import { FilterBar } from '../../components/sections/catalog/filterbar/FilterBar';
import { ProductGrid } from '../../components/sections/catalog/productgrid/ProductGrid';
import { SearchBar } from '../../components/sections/catalog/searchbar/SearchBar';
import style from './Catalog.module.css';

export const Catalog = () => {
    return (
        // <div style={{ margin: '5rem', maxWidth: '100%' }}>
        //     <img style={{ height: 'auto', width: '100%' }} src={maintenanceImg} alt="" />
        // </div>
        <div className={style.container}>
            <div className={style.top}>
                <SearchBar />
            </div>
            <div className={style.left}>
                <FilterBar />
            </div>
            <div className={style.right}>
                <ProductGrid />
            </div>
        </div>
    )
}
