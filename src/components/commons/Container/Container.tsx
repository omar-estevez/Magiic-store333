import style from './Container.module.css';
import type { ContainerProps } from './Container.types';

export const Container = ({ children }: ContainerProps) => {
    return (
        <div className={style.container}>
            {children}
        </div>
    )
}
