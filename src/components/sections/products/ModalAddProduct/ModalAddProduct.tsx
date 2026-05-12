import Modal from "react-modal";
import type { ModalProps } from "./ModalAddProduct.types";
import { Button } from "../../../commons/Button/Button";
import style from './ModalAddProduct.module.css';
import { MdOutlineClose } from "react-icons/md";
import { FormModal } from "./FormModal/FormModal";

export const ModalAddProduct = (props: ModalProps) => {
    return (
        <Modal
            isOpen={props.modalIsOpen}
            // onAfterOpen={afterOpenModal}
            // onRequestClose={() => props.setModalIsOpen(false)}
            className={style.modal__container}
            contentLabel="Example Modal"
            overlayClassName={style.modal__overlay}
            ariaHideApp={false}
        >
            <h2>Añadir producto</h2>
            <div className={style.btn__modal__container}>
                <Button as="button" text='' right_icon={<MdOutlineClose />} onClick={() => props.setModalIsOpen(false)} />
            </div>

            <FormModal setModalIsOpen={props.setModalIsOpen} />

        </Modal>
    )
}
