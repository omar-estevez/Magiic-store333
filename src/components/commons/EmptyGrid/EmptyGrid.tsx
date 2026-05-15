import { Button } from '../Button/Button'
import style from './EmptyGrid.module.css'
import type { EmptyGridProps } from './EmptyGrid.types'

export const EmptyGrid = ({ showBtn, functionBtn }: EmptyGridProps) => {
    return (
        <div className={style.empty_state}>
            <div className={style.empty_icon}>🛒</div>

            <h3>No hay productos disponibles</h3>

            <p>
                Todavía no agregamos productos a esta sección.
                Vuelve pronto para ver novedades.
            </p>

            {showBtn && <Button as="button" text="Explorar catálogo" onClick={functionBtn} />}
        </div>
    )
}
