import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../../../../store/product.store";
import style from './ProductDetail.module.css';
import { ImageSection } from "./ImageSection/ImageSection";
import { DataSection } from "./DataSection/DataSection";
import { Button } from "../../../commons/Button/Button";
import { IoChevronBackOutline } from "react-icons/io5";
import { LoaderSection } from "../../../commons/LoaderSection/LoaderSection";

export const ProductDetail = () => {

    const navigate = useNavigate();
    const params = useParams();

    const { product, getProductBySlug, error, loading } = useProductStore();

    useEffect(() => {
        if (!params) return;

        getProductBySlug(String(params.slug));
    }, [params, getProductBySlug]);

    if (loading) return <LoaderSection text="Buscando Producto..." />;

    if (error !== null) return <div className={style.detail__container}>No existe el producto</div>

    return (
        <div className={style.detail__container}>
            <div className={style.back__container}>
                <Button as="button" text="Volver" variant="secondary" left_icon={<IoChevronBackOutline />} onClick={() => navigate("/catalogo")} />
            </div>
            <div className={style.product__container}>
                <div className={style.child__container}>
                    <ImageSection images={product?.imageUrl} />
                </div>
                <div className={style.child__container}>
                    <DataSection data={product} />
                </div>
            </div>
        </div>
    )
}
