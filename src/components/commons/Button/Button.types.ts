import type { ReactNode, ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type BaseProps = {
    text: string;
    variant?: "primary" | "secondary";
    left_icon?: ReactNode;
    right_icon?: ReactNode;
};

export type ButtonProps =
    | ({
        as?: "button";
    } & BaseProps &
        ButtonHTMLAttributes<HTMLButtonElement>)
    | ({
        as: "link";
        href: string;
    } & BaseProps &
        AnchorHTMLAttributes<HTMLAnchorElement>);