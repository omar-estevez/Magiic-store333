import type { ButtonProps } from "./Button.types"

export const Button = ({ text, link, type, right = false, left = false, icon, target }: ButtonProps) => {
    return (
        <>
            {type === 'primary' && <a className="btn btn-primary" href={link} target={target}>{left && icon} <span>{text}</span> {right && icon}</a>}
            {type === 'secondary' && <a className="btn btn-secondary" href={link} target={target}>{left && icon} <span>{text}</span> {right && icon}</a>}
        </>
    )
}
