import style from './SearchBar.module.css';

export const SearchBar = () => {
    return (
        <div className={style.searchContainer}>
            <input id='search' type="text" maxLength={16} placeholder="Busca aqui" autoComplete='off' className={style.inputSearch} />
        </div>
    )
}
