import type { ReactNode } from "react";

export interface ButtonProps {
    text: string;
    link: string;
    type: string;
    right?: boolean;
    left?: boolean;
    icon?: ReactNode;
}