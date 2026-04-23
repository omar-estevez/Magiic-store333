import { FaArrowRight } from 'react-icons/fa6'
import { Button } from '../../../commons/Button/Button'
import style from './HeroActions.module.css'

export const HeroActions = () => {
    return (
        <div className={style.actions__container}>
            <h1>Magic Store 333</h1>
            <div className={style.subtitle}>
                <h2>Nueva coleccion</h2>
                <h2>Estilo que destaca</h2>
            </div>
            <p>Seleccionamos ropa y calzado de las mejores marcas para que encuentres tu look ideal, sin complicaciones.</p>
            <div className={style.button__container}>
                <Button text="Catalogo" link="/catalogo" target='_self' type="primary" icon={<FaArrowRight />} right />
                <Button text="Contacto" link="/contacto" target='_self' type="secondary" />
            </div>
        </div>
    )
}
