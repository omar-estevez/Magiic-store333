import { useEffect } from "react";
import { useProductStore } from "../../../../store/product.store";
import { VscCircleLargeFilled, VscEdit, VscTrash } from "react-icons/vsc";
import style from './TableProducts.module.css'

export const TableProducts = () => {

    const { allProducts, loading, error, getAllProducts } = useProductStore();

    useEffect(() => {
        getAllProducts();
    }, [getAllProducts]);

    // console.log(Object.keys(products[0]))
    // console.log(products[0].stock, products[0].sizes)

    if (loading) return <>Cargando productos...</>
    if (error) return <>Hubo un error, intente nuevamente...</>

    return (
        <div className={style.table__container}>
            <table>
                <thead>
                    <tr>
                        <th>Activo</th>
                        <th>Nombre</th>
                        <th>Categoria</th>
                        <th>Departamento</th>
                        <th>Precio</th>
                        <th>Tallas : Cantidad</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        allProducts.map((data) => (
                            <tr key={data.id}>
                                <td>{data.isActive ? <VscCircleLargeFilled color="green" /> : <VscCircleLargeFilled color="red" />}</td>
                                <td>{data.name}</td>
                                <td>{data.category}</td>
                                <td>{data.department}</td>
                                <td>{data.price}</td>
                                <td>
                                    <div>
                                        {
                                            data.sizes.map((data2, i) => (
                                                <span key={data2}> <b>{data2}</b> : {data.stock[i]}</span>
                                            ))
                                        }
                                    </div>
                                </td>
                                <td>
                                    <VscEdit />
                                    <VscTrash />
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}
