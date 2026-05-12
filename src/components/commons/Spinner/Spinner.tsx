import { FiLoader } from 'react-icons/fi'
import style from './Spinner.module.css'

export const Spinner = () => {
    return <FiLoader className={style.spin} />
}
