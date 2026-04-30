import { Input } from '../../../commons/Input/Input';
import style from './SearchBar.module.css';
import type { SearchBarProps } from './SearchBar.types';

export const SearchBar = ({ searchText, setSearchText }: SearchBarProps) => {
    return (
        <div className={style.searchContainer}>
            <Input id='search' type="text" value={searchText} onChange={(e) => setSearchText(e.target.value)} maxLength={16} placeholder="Busca aqui" autoComplete='off' />
        </div>
    )
}
