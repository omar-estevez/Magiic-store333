import { Button } from "../../commons/Button/Button"
import { TableProducts } from "./TableProducts/TableProducts"
import style from './DashProductsContainer.module.css';
import { useState } from "react";
import { ModalAddProduct } from "./ModalAddProduct/ModalAddProduct";
import { PiPlusBold } from "react-icons/pi";

export const DashProductsContainer = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);

    return (
        <div className={style.dash__products__container}>
            <h2>Productos</h2>

            <div className={style.btn__container}>
                <Button as="button" text="añadir producto" left_icon={<PiPlusBold />} onClick={() => setModalIsOpen(true)} />
            </div>

            <TableProducts />

            <ModalAddProduct modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} />
        </div>
    )
}
