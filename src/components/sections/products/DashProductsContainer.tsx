import { Button } from "../../commons/Button/Button"
import { TableProducts } from "./TableProducts/TableProducts"
import style from './DashProductsContainer.module.css';
import { useState } from "react";
import { ModalAddProduct } from "./ModalAddProduct/ModalAddProduct";
import { PiPlusBold } from "react-icons/pi";
import { useProductStore } from "../../../store/product.store";

export const DashProductsContainer = () => {

    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [editProduct, setEditProduct] = useState<string | null>('');
    const { clearProduct } = useProductStore();

    return (
        <div className={style.dash__products__container}>
            <h2>Productos</h2>

            <div className={style.btn__container}>
                <Button as="button" text="añadir producto" left_icon={<PiPlusBold />} onClick={() => { setEditProduct(null); setModalIsOpen(true); clearProduct(); }} />
            </div>

            <TableProducts setEditProduct={setEditProduct} setModalIsOpen={setModalIsOpen} />

            {modalIsOpen && <ModalAddProduct modalIsOpen={modalIsOpen} setModalIsOpen={setModalIsOpen} idProduct={editProduct} />}
        </div>
    )
}
