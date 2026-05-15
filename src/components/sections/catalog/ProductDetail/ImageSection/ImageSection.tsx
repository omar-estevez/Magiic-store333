import { useState } from "react"
import type { ImageSectionProps } from "./ImageSection.types"
import style from './ImageSection.module.css'
import clsx from "clsx";

export const ImageSection = ({ images }: ImageSectionProps) => {

    const [imageSelected, setimageSelected] = useState('');

    return (
        <div className={style.img__container}>
            <div className={style.img__main}>
                <div>
                    <img src={imageSelected ? imageSelected : (images?.[0] || "")} />
                </div>
            </div>
            <div className={style.img__items}>
                {images && images.map((data) =>
                    <div key={data} className={clsx(style.img__items__contain, imageSelected === data ? style.open : '')}>
                        <img src={data} alt={data} onClick={() => setimageSelected(data)} />
                    </div>)}
            </div>
        </div>
    )
}
