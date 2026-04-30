import style from './SearchBar.module.css';
import type { SearchBarProps } from './SearchBar.types';

export const SearchBar = ({ searchText, setSearchText }: SearchBarProps) => {
    return (
        <div className={style.searchContainer}>
            <input id='search' type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} maxLength={16} placeholder="Busca aqui" autoComplete='off' className={style.inputSearch} />
        </div>
    )
}
