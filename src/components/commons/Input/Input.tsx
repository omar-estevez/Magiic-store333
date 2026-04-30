import type { InputProps } from "./Input.types"
import style from './Input.module.css'

export const Input = (props: InputProps) => {
    return (
        <input className={style.input__styles} {...props} />
    )
}
