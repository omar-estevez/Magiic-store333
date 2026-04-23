import logo from '../../../assets/images/Logo_nobg.png'
import { contactFooter, navigationFooter } from '../../../data/footer'
import style from './Footer.module.css'


export const Footer = () => {
    return (
        <div className={style.footer__container}>
            <div className={style.top__footer}>
                <div className={style.img__contain}>
                    <img src={logo} alt='' />
                </div>
                <div className={style.nav__contain}>
                    <h4>Navegacion</h4>
                    <div>
                        {navigationFooter.map((data) => (
                            <span><a key={data.id} href={data.url}>{data.name}</a></span>
                        ))}
                    </div>
                </div>
                <div className={style.cont__contain}>
                    <h4>Contacto</h4>
                    <div>
                        {contactFooter.map((data) => (
                            <span><a key={data.id} href={data.url} target='_blank' style={data.id === 'facebook' ? { color: '#1877F2' } : { color: '#E1306C' }}><data.icon style={{ fontSize: '1.8rem' }} /></a></span>
                        ))}
                    </div>
                </div>
            </div>
            <div className={style.bottom__footer}>
                <p>© 2026 Magic Store 333 — Todos los derechos reservados</p>
            </div>

        </div>
    )
}
