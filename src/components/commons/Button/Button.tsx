import type { ButtonProps } from "./Button.types"

export const Button = (props: ButtonProps) => {

    const className = `btn btn-${props.variant ?? "primary"}`;

    const content = (
        <>
            {props.left_icon}
            <span>{props.text}</span>
            {props.right_icon}
        </>
    );

    if (props.as === "link") {
        return (
            <a className={`${className} ${props.className ?? ""}`} {...props}>
                {content}
            </a>
        );
    }

    return (
        <button className={`${className} ${props.className ?? ""}`} {...props}>
            {content}
        </button>
    );
};