import type { ProductType } from "../../../../../types/product.types";
import { CardProduct } from "../../../../commons/CardProduct/CardProduct";

interface ProductContainersProps {
    itemsArray: ProductType[];
}

export const ProductContainers = ({ itemsArray }: ProductContainersProps) => {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.8rem', margin: '1.8rem 0.5rem' }}>
            {
                itemsArray && itemsArray.map((product) => (
                    <CardProduct key={product.id} object={product} />
                ))
            }
        </div>
    )
}
