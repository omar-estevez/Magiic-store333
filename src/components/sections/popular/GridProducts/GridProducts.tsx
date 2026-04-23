import { CardProduct } from "../../../commons/CardProduct/CardProduct"
import style from './GridProducts.module.css'

export const GridProducts = () => {
    return (
        <div className={style.cards__container}>
            {
                [...new Array(6)].map((_, i: number) => (
                    <CardProduct key={i} />
                ))
            }

        </div>
    )
}
