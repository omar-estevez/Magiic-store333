import type { Dispatch, SetStateAction } from "react";

export interface ModalProps {
    modalIsOpen: boolean;
    setModalIsOpen: Dispatch<SetStateAction<boolean>>
}