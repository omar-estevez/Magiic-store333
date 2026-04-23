import { FaArrowRight } from "react-icons/fa6"
import { Button } from "../Button/Button"
import style from "./CardProduct.module.css"
// import testImg from "../../../assets/images/test_shoes.jpg"
import testImgNobg from "../../../assets/images/test_shoes_nobg.png"

export const CardProduct = () => {
    return (
        <div className={style.card__container}>
            <div className={style.img__container}>
                <img src={testImgNobg} alt="" />
            </div>
            <div className={style.title__container}>
                <h4>Sneakers</h4>
                <h3>Nike Air Max Neon</h3>
            </div>
            <div className={style.btn__container}>
                <p>$500</p>
                <Button link="" text="Ver Detalles" type="primary" icon={<FaArrowRight />} right />
            </div>
        </div>
    )
}
