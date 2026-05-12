import { useEffect, useState } from "react";
import { useProductStore } from "../../../../store/product.store";
import { VscCircleLargeFilled, VscEdit, VscHeartFilled, VscTrash } from "react-icons/vsc";
import style from './TableProducts.module.css'
import { formatPriceCop } from "../../../../utils/formatPriceCop";
import { Toast } from "../../../commons/Toast/Toast";
import clsx from "clsx";
import { Tooltip } from "react-tooltip";
import { AlertDialog } from "../../../commons/AlertDialog/AlertDialog";

export const TableProducts = () => {

    const { allProducts, loading, error, getAllProducts, updateProduct, deleteProduct } = useProductStore();
    const [updating, setUpdating] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined)

    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);

    const updateStatus = async (productId: string | undefined, status: boolean) => {
        if (!productId) return;
        try {
            setUpdating(true)

            await updateProduct(productId, {
                isActive: !status,
            });

            Toast.success('Estado actualizado');
        } catch (error) {
            console.error("Error al actualizar:", error);
        } finally {
            setTimeout(() => {
                setUpdating(false)
            }, 2000);
        }
    }

    const updatePopular = async (productId: string | undefined, status: boolean) => {
        if (!productId) return;

        const totalPopular = allProducts.filter((data) => (data.popular === true))

        if (totalPopular.length === 6) {
            Toast.warning('Ya existen los 6 populares');
            return;
        }

        try {
            setUpdating(true)

            await updateProduct(productId, {
                popular: !status,
            });

            Toast.success('Estado actualizado');
        } catch (error) {
            console.error("Error al actualizar:", error);
        } finally {
            setTimeout(() => {
                setUpdating(false)
            }, 2000);
        }
    }

    const handleDelete = async (productId: string | undefined) => {
        if (!productId) return;
        try {
            await deleteProduct(productId);

            Toast.success("Producto eliminado");
        } catch {
            Toast.error("Error eliminando producto");
        }
    }

    if (loading) return <>Cargando productos...</>
    if (error) return <>Hubo un error, intente nuevamente...</>

    return (
        <div className={clsx(style.table__container, updating && style.loading)} >
            <table>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Departamento</th>
                        <th>Precio</th>
                        <th>Tallas : Cantidad</th>
                        <th>Estado</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allProducts.map((data) => (
                            <tr key={data.id}>
                                <td>
                                    <div className={style.image__contain}>
                                        <img src={data.imageUrl[0]} alt='magic' />
                                    </div>
                                </td>
                                <td>{data.name}</td>
                                <td>{data.category}</td>
                                <td>{data.department}</td>
                                <td>{formatPriceCop(data.price)}</td>
                                <td>
                                    <div>
                                        {
                                            data.sizes.map((data2) => (
                                                <span key={data2}> <b>{data2}</b> : {data.stock[data2]}</span>
                                            ))
                                        }
                                    </div>
                                </td>
                                <td>
                                    <div>
                                        <VscCircleLargeFilled
                                            className={clsx(style.status__icon, (data.isActive ? style.status__green : style.status__red))}
                                            onClick={() => updateStatus(data.id, data.isActive)}
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content={data.isActive ? 'Activado' : 'desactivado'}
                                            data-tooltip-place="top"
                                        />
                                    </div>
                                </td>
                                <td className={style.icon__container}>
                                    <div>
                                        <VscHeartFilled
                                            className={clsx(style.heart__icon, (data.popular && style.popular__active))}
                                            onClick={() => updatePopular(data.id, data.popular)}
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content="Popular"
                                            data-tooltip-place="top"
                                        />
                                        <VscEdit
                                            className={style.edit__icon}
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content="Editar"
                                            data-tooltip-place="top"
                                        />
                                        <VscTrash
                                            className={style.trash__icon}
                                            onClick={() => { setSelectedId(data.id); setOpenDialog(true) }}
                                            data-tooltip-id="my-tooltip"
                                            data-tooltip-content="Eliminar"
                                            data-tooltip-place="top"
                                        />
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>

            <Tooltip id="my-tooltip" />
            <AlertDialog
                open={openDialog}
                title="Eliminar producto"
                description="Esta acción no se puede deshacer"
                onCancel={() => setOpenDialog(false)}
                onConfirm={async () => {
                    if (!selectedId) return
                    setOpenDialog(false)
                    await handleDelete(selectedId)
                }}
            />
        </div>
    )
}
