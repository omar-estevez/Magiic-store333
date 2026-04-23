import { FaHeart, FaRegComment } from "react-icons/fa";
import { FiBookmark, FiSend } from "react-icons/fi";
import style from './ProductCard.module.css'
import logo from '../../../../assets/images/Logo.png'
import post from '../../../../assets/images/post_insta.jpg'

export const ProductCard = () => {
    return (
        <div className={style.wrapper}>
            <div className={style.card__container}>

                {/* Header */}
                <div className={style.card__header}>
                    <div className={style.header__left}>
                        <img
                            src={logo}
                            alt="avatar"
                            className={style.header__avatar}
                        />
                        <span className={style.header__username}>
                            magiicstore333
                        </span>
                    </div>
                    <span className={style.header__menu}>•••</span>
                </div>

                {/* Imagen */}
                <img
                    src={post}
                    alt="post"
                    className={style.card__image}
                />

                {/* Acciones */}
                <div className={style.card__actions}>
                    <div className={style.actions__left}>
                        <FaHeart className={style.action__heart} />
                        <FaRegComment />
                        <FiSend />
                    </div>
                    <FiBookmark />
                </div>

                {/* Likes */}
                <div className={style.card__likes}>
                    Liked by <strong>jiho100x</strong> and <strong>35 others</strong>
                </div>

                {/* Caption */}
                <div className={style.card__caption}>
                    <strong>meanwhile_mae_54</strong> Weekend dump!
                </div>

            </div>
        </div>
    )
}
