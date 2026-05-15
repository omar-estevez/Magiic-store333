import style from './LoaderSection.module.css'
import type { LoaderSectionProps } from './LoaderSection.types'

export const LoaderSection = ({ text }: LoaderSectionProps) => {
    return (
        <section className={style.loading__container}>
            <div className={style.loader}></div>
            <p>{text}</p>
        </section>
    )
}
