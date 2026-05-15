import Modal from "react-modal";
import type { ModalProps } from "./ModalAddProduct.types";
import { Button } from "../../../commons/Button/Button";
import style from './ModalAddProduct.module.css';
import { MdOutlineClose } from "react-icons/md";
import { FormModal } from "./FormModal/FormModal";
import type { formModalType } from "./FormModal/FormModal.types";
import { useProductStore } from "../../../../store/product.store";
import { useEffect, useState } from "react";

export const ModalAddProduct = (props: ModalProps) => {

    const [loadingProduct, setloadingProduct] = useState<boolean>(false);
    const { product, getProduct, clearProduct } = useProductStore();

    useEffect(() => {
        if (!props.idProduct) return;

        getProduct(props.idProduct);
    }, [getProduct, props.idProduct]);

    if (!props.modalIsOpen) return null;

    const emptyForm: formModalType = {
        name: "",
        slug: "",
        category: "",
        department: "",
        price: "",
        sizes: [],
        stock: {},
        imageUrl: [],
        isActive: true,
        popular: false,
    };

    const initialValues: formModalType =
        props.idProduct && product
            ? {
                name: product.name,
                slug: product.slug,
                category: product.category,
                department: product.department,
                price: String(product.price),
                sizes: product.sizes,
                stock: product.stock,
                imageUrl: product.imageUrl.map((url) => ({
                    id: crypto.randomUUID(),
                    preview: url,
                })),
                isActive: product.isActive,
                popular: product.popular
            }
            : emptyForm;

    const handleLoading = () => {
        if (props.idProduct && !product) {
            setloadingProduct(true);
            return loadingProduct
        }
        setloadingProduct(false);
        return loadingProduct;
    };

    // const afterOpenModal = () => {
    //     if (props.idProduct) console.log(props.idProduct);
    // }

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
            <div className={style.btn__modal__container}>
                <Button as="button" text='' right_icon={<MdOutlineClose />} onClick={() => { props.setModalIsOpen(false); clearProduct(); }} />
            </div>
            <h2>{props.idProduct ? 'Editar producto' : 'Añadir producto'}</h2>
            {!handleLoading() &&
                <FormModal
                    key={props.idProduct ?? "create"}
                    setModalIsOpen={props.setModalIsOpen}
                    idProduct={props.idProduct}
                    initialValues={initialValues}
                />
            }
            {handleLoading() &&
                <>Cargando Producto...</>
            }
        </Modal>
    )
}
